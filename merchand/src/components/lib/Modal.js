import React, { useEffect } from "react";
import "./Modal.css";
import {Button} from "react-bootstrap"

export default function Modal({ title, children, open, onClose }) {
  return (
    open && (
      <>
        <div className="overlay" onClick={onClose} />
        <div className="modal-custom">
          <div className="modal-title">
            <h2>{title}</h2>
            <Button onClick={onClose} className="close-modal">
              CLOSE
            </Button>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </>
    )
  );
}
