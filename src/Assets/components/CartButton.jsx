import React from "react";

const CartButton = ({ cartCount, onClick }) => {
  return (
    <button 
      className="icon-btn" 
      aria-label="Shopping cart"
      onClick={onClick}
    >
      <i className="fas fa-shopping-cart"></i>
      {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
    </button>
  );
};

export default CartButton;