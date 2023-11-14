import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  fontfamily: "DM Sans, sans-serif",
  boxShadow: 24,
  p: 4,
  "@media screen and (min-width: 768px) and (max-width: 1399px)": {
    width: "40%"
  },
  "@media screen and (min-width: 320px) and (max-width: 767px)": {
    width: "60%"
  }
};

function ChildModal({ show, onClose }) {
  if (!show) {
    return null;
  }
  return (
    <Modal
      keepMounted
      open={show}
      onClose={onClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="keep-mounted-modal-title"
          variant="h6"
          component="h2"
          style={{ fontfamily: "DM Sans, sans-serif" }}
        >
          Registration successful.
          <p style={{ fontfamily: "DM Sans, sans-serif" }}>
            Congratulations 🐸!
          </p>
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          Please, log in to your account!
        </Typography>
        <Link to="/myAccount/signIn">
          <Button
            className="submit_register"
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "black",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: "grey"
              }
            }}
          >
            Sign in
          </Button>
        </Link>
      </Box>
    </Modal>
  );
}

ChildModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default ChildModal;
