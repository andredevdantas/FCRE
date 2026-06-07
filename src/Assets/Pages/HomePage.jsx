import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Pages/HomePage.css"; 
import Navbar from "../components/Navbar"; 
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { adicionarAoCarrinho } = useCart();
  const { user } = useAuth();

  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const roupas = data.filter(
          (item) => item.category === "men's clothing" || item.category === "women's clothing"
        );
        setDestaques(roupas.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar destaques:", err);
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
    <div className="homepage-container">
      <Navbar />

      <main id="page-content">
        <section className="hero-section">
          <div className="hero-images">
            <img src="/IMG/Top/Esquerda.jpg" alt="Editorial Esquerda" />
            <img src="/IMG/Top/Direita.jpg" alt="Editorial Direita" />
          </div>
          <div className="hero-text-glass">
            <h2>MID SEASON SALE</h2>
            <p className="discount">-50%</p>
            <p className="hero-subtitle">Em peças selecionadas</p>
            <button className="btn-shop-now" onClick={() => navigate("/store")}>
              Descubra a Coleção
            </button>
            <p className="sale-dates">Oferta por tempo limitado</p>
          </div>
        </section>

        <section className="content-section">
          <div className="content-wrapper">
            <div className="image-large">
              <img src="/IMG/Lore Ipsum/LORE IPSUM 3.png" alt="Artesanato" />
            </div>
            <div className="right-group">
              <div className="image-stack">
                <img src="/IMG/Lore Ipsum/LORE IPSUM 2.png" alt="Detalhe 1" />
                <img src="/IMG/Lore Ipsum/LORE IPSUM 1.png" alt="Detalhe 2" />
              </div>
              <div className="content-text">
                <h3>A Arte da Alfaiataria</h3>
                <p>Redefinindo o estilo contemporâneo com peças atemporais projetadas para versatilidade, conforto e sofisticação.</p>
                <p>Cada costura conta uma história de dedicação. Nossos tecidos são selecionados a dedo para garantir um caimento impecável que acompanha o seu ritmo urbano.</p>
                <p>Descubra o luxo minimalista onde menos é definitivamente mais.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="our-style">
          <h4>Seleção Exclusiva</h4>
          {loading ? (
            <div className="loading-destaques">Preparando a vitrine...</div>
          ) : (
            <div className="style-grid">
              {destaques.map((produto) => (
                <div className="style-card" key={produto.id}>
                  <div className="card-img-container">
                    <img src={produto.image} alt={produto.title} />
                  </div>
                  <p className="product-title">{produto.title}</p>
                  <p className="product-price">R$ {(produto.price * 5).toFixed(2)}</p>
                  <div className="card-buttons">
                    <button 
                      className="btn-primary-home"
                      onClick={() => handleAdicionar(produto)}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bottom-section">
          <div className="bottom-grid">
            {["DAY", "NIGHT", "ANYWHERE", "EVERYWHERE"].map((label) => (
              <div className="bottom-card" key={label}>
                <img src={`/IMG/Bottom/${label}.png`} alt={`Look ${label}`} />
                <div className="overlay-text">{label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;