import React from "react";
import TextField from "@mui/material/TextField";

function AccountDetails() {
  return (
    <div className="checkout_page">
      <div className="checkout_main-top">
        <div className="account-details_title">Account Details</div>
      </div>
      <div className="checkout_main-bottom">
        <div className="main-bottom_billing">
          <div className="billing_names">
            <div className="billing_textfield-items">
              <TextField
                id="first-name"
                label="First name *"
                variant="standard"
                sx={{ width: 270 }}
              />
              <TextField
                id="last-name"
                label="Last name *"
                variant="standard"
                sx={{ marginRight: 0, width: 270 }}
              />
            </div>
          </div>
          <div className="billing_info-items">
            <TextField
              id="standard-basic"
              label="Company Name"
              variant="standard"
              sx={{ width: 580 }}
            />
            <TextField
              id="standard-basic"
              label="Street Address *"
              variant="standard"
              sx={{ width: 580 }}
            />
            <TextField
              id="standard-basic"
              label="Postcode / ZIP *"
              variant="standard"
              sx={{ width: 580 }}
            />
            <TextField
              id="standard-basic"
              label="Town / City *"
              variant="standard"
              sx={{ width: 580 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
