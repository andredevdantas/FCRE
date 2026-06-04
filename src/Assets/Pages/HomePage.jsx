import React, { useEffect, useRef, useState } from "react";
import "../CSS/HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    const navbarOffsetTop = navbar.offsetTop;

    const handleScroll = () => {
      if (window.pageYOffset > navbarOffsetTop) {
        navbar.classList.add("fixed");
        document.body.style.paddingTop = navbar.offsetHeight + "px";
      } else {
        navbar.classList.remove("fixed");
        document.body.style.paddingTop = "0px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleDocumentClick = () => {
      setSidebarVisible(false);
      setCartVisible(false);
      setLoginVisible(false);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="homepage-container">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`sidebar ${sidebarVisible ? "show" : ""}`}
        onClick={stopPropagation}
      >
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button
            className="sidebar-close"
            onClick={() => setSidebarVisible(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={() => setSidebarVisible(false)}>Home</Link>
          <Link to="/store" className="sidebar-link" onClick={() => setSidebarVisible(false)}>Store</Link>
          <Link to="/custom" className="sidebar-link" onClick={() => setSidebarVisible(false)}>Custom Order</Link>
        </nav>
      </aside>

      {/* Navbar */}
      <nav ref={navbarRef} className="navbar" onClick={stopPropagation}>
        <button
          className="menu-button"
          aria-label="Open menu"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarVisible(true);
          }}
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="logo">
          <img src="/IMG/logo.png" alt="Logo FCER" className="logo-img" />
        </div>
        <div className="nav-icons">
          <button
            aria-label="Shopping cart"
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              setCartVisible((prev) => !prev);
              setLoginVisible(false);
            }}
          >
            <i className="fas fa-shopping-cart"></i>
          </button>
          <button
            aria-label="User account"
            className="icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              setLoginVisible((prev) => !prev);
              setCartVisible(false);
            }}
          >
            <i className="fas fa-user"></i>
          </button>
        </div>
      </nav>

      {/* Popups Overlays */}
      {(cartVisible || loginVisible) && (
        <div 
          className="popup-overlay" 
          onClick={() => { 
            setCartVisible(false); 
            setLoginVisible(false); 
          }}
        ></div>
      )}

      {/* Cart Popup */}
      {cartVisible && (
        <div className="cart-popup" onClick={stopPropagation}>
          <h3>Seu Carrinho</h3>
          <p>Faça login para ver os produtos adicionados ao carrinho.</p>
          <div className="popup-actions">
            <button 
              className="btn-primary" 
              onClick={() => { 
                setCartVisible(false); 
                setLoginVisible(true); 
              }}
            >
              Entrar agora
            </button>
            <button className="btn-link" onClick={() => setCartVisible(false)}>Fechar</button>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {loginVisible && (
        <div className="login-popup" onClick={stopPropagation}>
          <h2>Entrar na Conta</h2>
          <div className="login-group">
            <label htmlFor="username">Usuário</label>
            <input id="username" type="text" placeholder="Digite seu usuário" />
          </div>
          <div className="login-group">
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" placeholder="Digite sua senha" />
          </div>
          <button className="login-submit">Entrar</button>
          <button
            className="login-close-text"
            onClick={() => setLoginVisible(false)}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Main Content */}
      <main id="page-content">
        {/* Hero */}
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

        {/* Content */}
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

        {/* Our Style */}
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
                  <button className="btn-primary">Comprar</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Section */}
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