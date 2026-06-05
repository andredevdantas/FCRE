import React, { useState, useEffect } from "react";
import "../Styles/Pages/Store.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Store = () => {
  const { adicionarAoCarrinho } = useCart();
  const { user } = useAuth(); 

  const [roupas, setRoupas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((resposta) => resposta.json())
      .then((dados) => {
        const apenasRoupas = dados.filter(
          (item) => item.category === "men's clothing" || item.category === "women's clothing"
        );
        setRoupas(apenasRoupas);
        setLoading(false);
      })
      .catch((erro) => {
        console.error(erro);
        setLoading(false);
      });
  }, []);

  const handleAdicionar = (produto) => {
    if (!user) {
      alert("Por favor, faça login para adicionar produtos ao seu carrinho!");
      return; 
    }
    
    const produtoFormatado = {
      id: produto.id,
      nome: produto.title,
      preco: produto.price * 5,
      imagem: produto.image
    };

    adicionarAoCarrinho(produtoFormatado);
  };

  return (
    <div className="store-container">
      <Navbar />

      <main className="products-section">
        <h1 className="products-title">Loja de Roupas</h1>
        
        {loading ? (
          <div className="loading-container">
            Carregando produtos da vitrine...
          </div>
        ) : (
          <div className="products-grid">
            {roupas.map((produto) => (
              <div key={produto.id} className="product-card">
                <div className="product-img-container">
                  <img src={produto.image} alt={produto.title} />
                </div>
                <h2>{produto.title}</h2>
                <p>R$ {(produto.price * 5).toFixed(2)}</p>
                <button
                  onClick={() => handleAdicionar(produto)}
                  className="product-add"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Store;