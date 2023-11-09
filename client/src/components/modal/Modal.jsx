/* eslint-disable react/prop-types */
import React from "react";

function Modal({ isOpen, closeModal, handleLogout }) {
  const handleOk = () => {
    closeModal();
    handleLogout();
  };

  return (
    <div>
      {isOpen && ( // Отображаем модальное окно только если isOpen равно true
        <div className="modal">
          <div className="modal-content">
            <p className="modal-text">Modal Content</p>
            <button type="submit" onClick={handleOk}>
              OK
            </button>
            <button type="submit" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
