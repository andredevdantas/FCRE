import React from "react";
import "../Styles/Pages/Store.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const roupas = [
  { id: 1, nome: "Camiseta Oversized", preco: 89.9, imagem: "/IMG/Store/Oversized.jpeg" },
  { id: 2, nome: "Jaqueta Jeans", preco: 199.9, imagem: "/IMG/Store/Jaqueta.jpg" },
  { id: 3, nome: "Calça Cargo", preco: 149.9, imagem: "/IMG/Store/Cargo.jpeg" },
  { id: 4, nome: "Moletom Canguru", preco: 129.9, imagem: "/IMG/Store/Moletom.png" },
];

const Store = () => {
  const { adicionarAoCarrinho } = useCart();

  return (
    <div className="store-container">
      <Navbar />

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