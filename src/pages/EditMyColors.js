import React, { useState, useEffect, useCallback } from "react";
import { ChromePicker } from 'react-color';
import { ReactComponent as IconClose } from "./icon-close.svg";
import "./EditMyColors.css";

export const EditMyColors = ({ isOpen, onClose, initialColor, onColorUpdate }) => {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    setCurrentColor(initialColor); // Ensure that initialColor changes are reflected
  }, [initialColor]);

  const handleColorChange = useCallback((color) => {
    setCurrentColor(color.hex);  // Update the current color directly
    if (onColorUpdate) {
      onColorUpdate(color.hex);  // Call the callback if provided
    }


  }, [onColorUpdate]);

  const handleCancel = () => {
    if (onColorUpdate) {
      onColorUpdate(initialColor); // Revert to the initial color
    }
    onClose(); // Close the modal
  };

  const onWrapperClick = (event) => {
    if (event.target.classList.contains("modal-wrapper")) onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-wrapper" onClick={onWrapperClick}>
      <div className="modal-content" style={{ textAlign: 'center' }}>
        <button className="modal-close-button" onClick={onClose}>
          <IconClose />
        </button>
        <ChromePicker
          color={currentColor}
          onChangeComplete={handleColorChange}
        />
        <div>
          <button onClick={() => onClose()} style={{ marginRight: '10px' }}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
