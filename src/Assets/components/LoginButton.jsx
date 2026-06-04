import React from "react";

const LoginButton = ({ onClick }) => {
  return (
    <button 
      className="icon-btn" 
      aria-label="User account"
      onClick={onClick}
    >
      <i className="fas fa-user"></i>
    </button>
  );
};

export default LoginButton;