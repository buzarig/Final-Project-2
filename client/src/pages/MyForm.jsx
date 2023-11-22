import "../styles/_contactstitle.scss";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const SelectType = [
  { label: "choise1", choiseNumb: 1 },
  { label: "choise2", choiseNumb: 2 },
  { label: "choise3", choiseNumb: 3 }
];

function MyForm({ handleFormSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: null,
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: null,
      message: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleFormSubmit(formData);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="first-name"
          name="firstName"
          label="First name"
          variant="standard"
          value={formData.firstName}
          onChange={handleChange}
          sx={{ marginBottom: 10, marginRight: 5 }}
        />
        <TextField
          id="last-name"
          name="lastName"
          label="Last Name"
          variant="standard"
          value={formData.lastName}
          onChange={handleChange}
          sx={{ marginBottom: 10, marginRight: 5 }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="standard"
          value={formData.email}
          onChange={handleChange}
          sx={{ marginBottom: 10, marginRight: 5 }}
        />

        <Autocomplete
          disableCloseOnSelect
          id="disable-close-on-select"
          options={SelectType}
          sx={{ marginBottom: 10, width: 200 }}
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
          onChange={(e, newValue) => {
            setFormData((prevData) => ({
              ...prevData,
              subject: newValue
            }));
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TextField
          id="message"
          name="message"
          label="Message"
          variant="standard"
          sx={{ width: "400px", marginBottom: 10 }}
          value={formData.message}
          onChange={handleChange}
        />
        <Button
          sx={{
            width: "400px",
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "grey"
            },
            marginBottom: 10
          }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Send
        </Button>
      </Box>
    </form>
  );
}

export default MyForm;
