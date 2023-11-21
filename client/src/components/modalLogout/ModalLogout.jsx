/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeAccessToken } from "../../redux/actions/tokenActions";
import { clear } from "../../redux/actions/cartActions";
import { removeUserInfo } from "../../redux/actions/customer";
import "./ModalLogout.scss";

function Modal({ isOpen, closeModal }) {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(removeAccessToken());
    dispatch(clear());
    dispatch(removeUserInfo());
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-container" onClick={closeModal}>
          <div className="modal-content">
            <p className="modal-text">Are you sure you want to exit?</p>
            <button
              type="submit"
              className="btn-modal-cancel"
              onClick={closeModal}
            >
              Cancel
            </button>
            <Link to="/" className="btn-modal" onClick={handleLogOut}>
              Exit
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
