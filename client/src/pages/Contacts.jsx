import "../styles/_contactstitle.scss";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import MyForm from "./MyForm";

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
  display: "flex",
  flexDirection: "column"
};

const buttonContainerStyle = {
  gridColumn: "span 2",
  textAlign: "center",
  paddingBottom: "200px"
};

function Contacts() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: null,
    message: ""
  });

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();

        console.log("Response from server:", response);
        console.log("Result parsed from JSON:", result);

        if (result.success) {
          handlePopupOpen();
        } else {
          console.error("Failed to send email:", result.error);
        }
      } else {
        console.error(
          "Failed to send email. Server responded with status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
      <div style={centerContentStyle}>
        <div className="contacts_main">
          <div className="contacts_title">Contacts Us</div>
          <div className="contacts_subtitle">
            Say Hello, send us your thoughts about our products, or share your
            ideas with our Team!
          </div>
        </div>
        <Box style={containerStyle} className="container">
          <MyForm formData={formData} setFormData={setFormData} handleFormSubmit={handleFormSubmit} />

          <div style={buttonContainerStyle}>
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
          </div>
        </Box>
      </div>
  );
}

export default Contacts;
