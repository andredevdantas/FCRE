import React, { useEffect, useState } from "react";
import "../Styles/Pages/Store.css";
import Navbar from "../components/Navbar.jsx"; 

const roupas = [
  { id: 1, nome: "Camiseta Oversized", preco: 89.9, imagem: "/IMG/Store/Oversized.jpeg" },
  { id: 2, nome: "Jaqueta Jeans", preco: 199.9, imagem: "/IMG/Store/Jaqueta.jpg" },
  { id: 3, nome: "Calça Cargo", preco: 149.9, imagem: "/IMG/Store/Cargo.jpeg" },
  { id: 4, nome: "Moletom Canguru", preco: 129.9, imagem: "/IMG/Store/Moletom.png" },
];

const Store = () => {
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

  const totalCarrinho = cart.reduce((acc, item) => acc + item.preco, 0).toFixed(2);

  return (
    <div className="store-container">
      <Navbar 
        cartItems={cart} 
        removerDoCarrinho={removerDoCarrinho} 
        totalCarrinho={totalCarrinho} 
      />

      <main className="products-section">
        <h1 className="products-title">Loja de Roupas</h1>
        
        <div className="products-grid">
          {roupas.map((produto) => (
            <div key={produto.id} className="product-card">
              <div className="product-img-container">
                <img src={produto.imagem} alt={produto.nome} />
              </div>
              <h2>{produto.nome}</h2>
              <p>R$ {produto.preco.toFixed(2)}</p>
              <button
                onClick={() => adicionarAoCarrinho(produto)}
                className="product-add"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Store;