import React, { useState } from 'react';
// import './Errorbox.css';

const ErrorBox = ({ message }) => {
  const [showError, setShowError] = useState(true);

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <div className={`error-box ${showError ? 'show' : 'hide'}`}>
      <div className="error-content">
        <span className="error-message">{message}</span>
        <button className="error-close-button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorBox;
