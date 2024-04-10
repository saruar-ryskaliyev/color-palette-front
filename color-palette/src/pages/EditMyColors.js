import React, { useState, useEffect } from "react";
import { PhotoshopPicker } from 'react-color';
import { ReactComponent as IconClose } from "./icon-close.svg";
import "./EditMyColors.css";

export const EditMyColors = ({ isOpen, onClose, initialColor, onColorUpdate }) => {
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [key, setKey] = useState(Date.now()); 

  useEffect(() => {
    setCurrentColor(initialColor);
    setKey(Date.now()); 
  }, [initialColor, isOpen]); 

  const handleColorChange = (color) => {
    setCurrentColor(color.hex);
  };

  const handleSave = () => {
    if (onColorUpdate) {
      onColorUpdate(currentColor); 
    }
    onClose(); 
  };

  const handleCancel = () => {
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-wrapper" onClick={(event) => {
      if (event.target.classList.contains("modal-wrapper")) onClose();
    }}>
      <div className="modal-content" style={{ textAlign: 'center' }}>
        <button className="modal-close-button" onClick={onClose}>
          <IconClose />
        </button>
        <PhotoshopPicker
          key={key} 
          color={currentColor}
          onChangeComplete={handleColorChange}
          onAccept={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};
