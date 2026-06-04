import React from "react";
import "../Styles/Pages/HomePage.css"; 
import Navbar from "../components/Navbar.jsx"; 

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navbar />

      <main id="page-content">
        <section className="hero-section">
          <div className="hero-images">
            <img src="/IMG/Top/Esquerda.jpg" alt="Imagem esquerda" />
            <img src="/IMG/Top/Direita.jpg" alt="Imagem direita" />
          </div>
          <div className="hero-text">
            <h2>MID SEASON SALE</h2>
            <p className="discount">-50%</p>
            <p className="hero-subtitle">On selected items</p>
            <button className="btn-shop-now">Shop now</button>
            <p className="sale-dates">From 26 February to 30 April</p>
          </div>
        </section>

        {/* Editorial Content */}
        <section className="content-section">
          <div className="content-wrapper">
            <div className="image-large">
              <img src="/IMG/Lore Ipsum/LORE IPSUM 3.png" alt="Imagem destaque" />
            </div>
            <div className="right-group">
              <div className="image-stack">
                <img src="/IMG/Lore Ipsum/LORE IPSUM 2.png" alt="Imagem secundária 1" />
                <img src="/IMG/Lore Ipsum/LORE IPSUM 1.png" alt="Imagem secundária 2" />
              </div>
              <div className="content-text">
                <h3>Lorem Ipsum</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p>Quisque tempor luctus ante, ut pellentesque tortor viverra at.</p>
                <p>Praesent vel vulputate nulla. Donec vitae vestibulum quam.</p>
                <p>Pellentesque in velit velit. Nunc maximus leo tortor.</p>
                <p>Suspendisse sapien mi, porttitor rhoncus felis non.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Style*/}
        <section className="our-style">
          <h4>Our Style</h4>
          <div className="style-grid">
            {["1", "2", "3", "4"].map((num) => (
              <div className="style-card" key={num}>
                <div className="card-img-container">
                  <img src={`/IMG/Our Style/Our Style ${num}.png`} alt={`Style ${num}`} />
                </div>
                <p className="product-title">Lorem ipsum dolor sit amet</p>
                <p className="product-price">$15.00</p>
                <div className="card-buttons">
                  <button className="btn-outline">+ Carrinho</button>
                  <button className="btn-primary-home">Comprar</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Section*/}
        <section className="bottom-section">
          <div className="bottom-grid">
            {["DAY", "NIGHT", "ANYWHERE", "EVERYWHERE"].map((label) => (
              <div className="bottom-card" key={label}>
                <img src={`/IMG/Bottom/${label}.png`} alt={label} />
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