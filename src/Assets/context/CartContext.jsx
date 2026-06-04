import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const adicionarAoCarrinho = (produto) => {
    setCart((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };
  
  const limparCarrinho = () => {
    setCart([]);
  };

  const totalCarrinho = cart.reduce((acc, item) => acc + item.preco, 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cart, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho, totalCarrinho }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);