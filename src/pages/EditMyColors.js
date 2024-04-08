import React from "react";
import { ReactComponent as IconClose } from "./icon-close.svg";
import "./EditMyColors.css";

export const EditMyColors = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If the modal isn't open, don't render anything

  const onWrapperClick = (event) => {
    if (event.target.classList.contains("modal-wrapper")) onClose();
  };

  return (
    <div className="modal-wrapper" onClick={onWrapperClick}>
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <IconClose />
        </button>
        

        {children}
      </div>
    </div>
  );
};
