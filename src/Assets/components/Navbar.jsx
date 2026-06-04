import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/components/Navbar.css"; 

const Navbar = ({ cartItems = [], removerDoCarrinho, totalCarrinho }) => {
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleDocumentClick = () => {
      setSidebarVisible(false);
      setCartVisible(false);
      setLoginVisible(false);
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const stopPropagation = (e) => e.stopPropagation();

  const handleLoginClose = () => {
    setLoginVisible(false);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      {/* Sidebar */}
      <aside ref={sidebarRef} className={`sidebar ${sidebarVisible ? "show" : ""}`} onClick={stopPropagation}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="sidebar-close" onClick={() => setSidebarVisible(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link" onClick={() => setSidebarVisible(false)}>Home</Link>
          <Link to="/store" className="sidebar-link" onClick={() => setSidebarVisible(false)}>Store</Link>
          <Link to="/custom" className="sidebar-link" onClick={() => setSidebarVisible(false)}>Custom Order</Link>
        </nav>
      </aside>

      {/* Navbar Principal */}
      <nav ref={navbarRef} className="navbar" onClick={stopPropagation}>
        <button className="menu-button" onClick={(e) => { e.stopPropagation(); setSidebarVisible(true); }}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="logo">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>FCER</Link>
        </div>
        <div className="nav-icons">
          <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setCartVisible(!cartVisible); setLoginVisible(false); }}>
            <i className="fas fa-shopping-cart"></i>
            {cartItems.length > 0 && <span className="cart-count">({cartItems.length})</span>}
          </button>
          <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setLoginVisible(!loginVisible); setCartVisible(false); }}>
            <i className="fas fa-user"></i>
          </button>
        </div>
      </nav>

      {/* Popups Overlays */}
      {(cartVisible || loginVisible) && (
        <div className="popup-overlay" onClick={() => { setCartVisible(false); setLoginVisible(false); }}></div>
      )}

      {/* Cart Popup */}
      {cartVisible && (
        <div className="cart-popup" onClick={stopPropagation}>
          <h3>Seu Carrinho</h3>
          {cartItems.length === 0 ? (
            <>
              <p>Faça login ou adicione produtos para ver seu carrinho.</p>
              <div className="popup-actions">
                <button className="btn-primary" onClick={() => { setCartVisible(false); setLoginVisible(true); }}>Entrar agora</button>
                <button className="btn-link" onClick={() => setCartVisible(false)}>Fechar</button>
              </div>
            </>
          ) : (
            <ul className="cart-list">
              {cartItems.map((item, index) => (
                <li key={index} className="cart-item">
                  <span>{item.nome}</span>
                  <div className="cart-item-actions">
                    <span>R$ {item.preco.toFixed(2)}</span>
                    <button onClick={() => removerDoCarrinho(index)} className="cart-remove">Remover</button>
                  </div>
                </li>
              ))}
              <li className="cart-total">Total: R$ {totalCarrinho}</li>
            </ul>
          )}
        </div>
      )}

      {/* Login Popup */}
      {loginVisible && (
        <div className="login-popup" onClick={stopPropagation}>
          <h2>Entrar na Conta</h2>
          <div className="login-group">
            <label htmlFor="username">Usuário</label>
            <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu usuário" />
          </div>
          <div className="login-group">
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" />
          </div>
          <button className="login-submit">Entrar</button>
          <button className="login-close-text" onClick={handleLoginClose}>Cancelar</button>
        </div>
      )}
    </>
  );
};

export default Navbar;