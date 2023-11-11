import "../styles/_contactstitle.scss";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

const SelectType = [
  { label: "choise1", choiseNumb: 1 },
  { label: "choise2", choiseNumb: 2 },
  { label: "choise3", choiseNumb: 3 }
];

const centerContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "100px"
};

const containerStyle = {
  maxWidth: "800px",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "60px"
};

const buttonContainerStyle = {
  gridColumn: "span 2",
  textAlign: "center",
  paddingBottom: "200px"
};

function Contacts() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: null,
    message: ""
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(`${name}: ${value}`);
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: null,
      message: ""
    });

    handlePopupOpen();
  };
  return (
    <div style={centerContentStyle}>
      <div className="contacts_main">
        <div className="contacts_title">Contacts Us</div>
        <div className="contacts_subtitle">
          Say Hello send us your thoughts about our products or share your ideas
          with our Team!
        </div>
      </div>
      <Box style={containerStyle} className="container">
        <TextField
          id="first-name"
          name="firstName"
          label="First name"
          variant="standard"
          className="textfieild-adaptive"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          id="last-name"
          name="lastName"
          label="Last Name"
          className="textfieild-adaptive"
          variant="standard"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="standard"
          className="textfieild-adaptive"
          value={formData.email}
          onChange={handleChange}
        />

        <Autocomplete
          disableCloseOnSelect
          id="disable-close-on-select"
          className="autocomplete-adaptive"
          options={SelectType}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Subject"
              sx={{
                "& .MuiInput-underline:before": {
                  borderBottom: "none"
                },
                "& .MuiInput-underline:after": {
                  borderBottom: "1px solid black"
                }
              }}
            />
          )}
        />
        <TextField
          id="message"
          name="message"
          label="Message"
          variant="standard"
          className="textfieild-adaptive-message"
          sx={{ gridColumn: "span 2", width: "100%" }}
          value={formData.message}
          onChange={handleChange}
        />
        <div style={buttonContainerStyle}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "400px",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "grey"
              }
            }}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </div>
        {isPopupOpen && (
          <div className="contacts_popupopened">
            <div className="popupopened_title">Complete</div>
            <button
              className="popupopened_btn"
              type="button"
              onClick={handlePopupClose}
            >
              OK
            </button>
          </div>
        )}
      </Box>
    </div>
  );
}

export default Contacts;
