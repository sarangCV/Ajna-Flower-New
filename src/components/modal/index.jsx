import React from "react";
import "./style.css";

function Modal({ setOpenModal, modalConfirm, description }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h3>Are You Sure You Want to Continue?</h3>
        </div>
        <div className="body">
          <p>{description}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={modalConfirm}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
