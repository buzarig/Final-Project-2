/* eslint-disable react/prop-types */
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeAccessToken } from "../../redux/actions/tokenActions";
import { clear } from "../../redux/actions/cartActions";
import { removeUserInfo } from "../../redux/actions/customer";
import "./ModalLogout.scss";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const contentStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "8px",
  textAlign: "center"
};

function ModalLogout({ isOpen, closeModal }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(removeAccessToken());
    closeModal();
    dispatch(clear());
    dispatch(removeUserInfo());
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-logout-title"
      aria-describedby="modal-logout-description"
      style={modalStyle}
    >
      <Box sx={contentStyle}>
        <Typography variant="h6" id="modal-logout-title" gutterBottom>
          Are you sure you want to exit?
        </Typography>
        <div className="flex-btn">
          <Button
            onClick={closeModal}
            variant="contained"
            color="secondary"
            sx={{
              width: "80px",
              backgroundColor: "black",
              marginTop: "10px",
              "&:hover": {
                backgroundColor: "grey"
              }
            }}
          >
            Cancel
          </Button>
          <Link to="/" className="btn-modal" onClick={handleLogOut}>
            <Button
              variant="contained"
              sx={{
                width: "80px",
                backgroundColor: "black",
                marginTop: "10px",
                "&:hover": {
                  backgroundColor: "grey"
                }
              }}
            >
              Exit
            </Button>
          </Link>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalLogout;
