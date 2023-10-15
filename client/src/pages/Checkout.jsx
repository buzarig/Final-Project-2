import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../styles/_checkout.scss";

function Checkout() {
  return (
    <div className="checkout_page">
      <div className="checkout_main-top">
        <div className="main-top_title">Checkout</div>
        <div className="main-top_login">
          {" "}
          Returning Customer?
          <div className="login-mark-text"> Click here to login </div>
        </div>
        <div className="main-top_coupon">
          <div className="coupon-text">
            Have a coupon?{" "}
            <div className="login-mark-text">
              Click here to enter your code{" "}
            </div>{" "}
          </div>
          <div className="coupon-box">
            <div className="box-title">
              If you have a coupon code, please apply it below.
            </div>
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
            <div className="billing_title">Billing Details</div>
            <div className="billing_textfield-items">
              <div className="billing_textfield-item">
                <TextField
                  id="first-name"
                  label="First name *"
                  variant="standard"
                  sx={{ width: 270 }}
                />
              </div>
              <div className="billing_textfield-item">
                <TextField
                  id="last-name"
                  label="Last name *"
                  variant="standard"
                  sx={{ marginRight: 0, width: 270 }}
                />
              </div>
            </div>
          </div>
          <div className="billing_info-items">
            <div className="billing_info-item">
              <TextField
                id="standard-basic"
                label="Company Name"
                variant="standard"
                sx={{ width: 580 }}
              />
            </div>
            <div className="billing_info-item">
              <TextField
                id="standard-basic"
                label="Street Address *"
                variant="standard"
                sx={{ width: 580 }}
              />
            </div>
            <div className="billing_info-item">
              <TextField
                id="standard-basic"
                label="Postcode / ZIP *"
                variant="standard"
                sx={{ width: 580 }}
              />
            </div>
            <div className="billing_info-item">
              <TextField
                id="standard-basic"
                label="Town / City *"
                variant="standard"
                sx={{ width: 580 }}
              />
            </div>
            <div className="billing_info-item">
              <TextField
                id="standard-basic"
                label="Phone *"
                variant="standard"
                sx={{ width: 580 }}
              />
            </div>
            <div className="billing_info-item">
              <TextField
                id="email"
                label="Email *"
                variant="standard"
                sx={{ width: 580 }}
              />
            </div>
            <div className="billing_checkbox">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Create an account?"
                />
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Ship to a different addres?"
                />
              </FormGroup>
            </div>
            <div className="billing_info-item">
              <TextField
                id="notes"
                label="Order notes"
                variant="standard"
                sx={{ width: 580 }}
              />
            </div>
          </div>
        </div>
        <div className="main-bottom_order">
          <div className="order_title"> Your Order</div>
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
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account
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
  );
}
export default Checkout;

