import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/components/Navbar.css";

// Botões
import CartButton from "./CartButton.jsx";
import LoginButton from "./LoginButton.jsx";

// Modais
import CartPopup from "./Modals/CartPopup.jsx";
import LoginPopup from "./Modals/LoginPopup.jsx";
import LogoutPopup from "./Modals/LogoutPopup.jsx"; 

// Contextos Globais
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { cart, removerDoCarrinho, totalCarrinho, limparCarrinho } = useCart();
  const { user, logout } = useAuth(); 
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

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
      setLogoutVisible(false);
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <>
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

      <nav ref={navbarRef} className="navbar" onClick={stopPropagation}>
        <button className="menu-button" onClick={(e) => { e.stopPropagation(); setSidebarVisible(true); }}>
          <i className="fas fa-bars"></i>
        </button>
        
        <div className="logo">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>FCER</Link>
        </div>
        
        <div className="nav-icons">
          {user && <span style={{ fontSize: '14px', marginRight: '8px', fontWeight: '500' }}>Olá, {user.nome}</span>}
          
          <CartButton 
            cartCount={cart.length} 
            onClick={(e) => {
              e.stopPropagation();
              setCartVisible(!cartVisible);
              setLoginVisible(false);
              setLogoutVisible(false);
            }} 
          />

          {user ? (
            <button 
              className="icon-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setLogoutVisible(!logoutVisible);
                setCartVisible(false);
              }} 
              title="Sair" 
              aria-label="Sair da conta"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          ) : (
            <LoginButton 
              onClick={(e) => {
                e.stopPropagation();
                setLoginVisible(!loginVisible);
                setCartVisible(false);
              }} 
            />
          )}
        </div>
      </nav>

      {(cartVisible || loginVisible || logoutVisible) && (
        <div className="popup-overlay" onClick={() => { 
          setCartVisible(false); 
          setLoginVisible(false); 
          setLogoutVisible(false);
        }}></div>
      )}

      {cartVisible && (
        <CartPopup 
          cartItems={cart}
          removerDoCarrinho={removerDoCarrinho}
          totalCarrinho={totalCarrinho}
          onClose={() => setCartVisible(false)}
          onOpenLogin={() => {
            setCartVisible(false);
            setLoginVisible(true);
          }}
        />
      )}

      {loginVisible && !user && (
        <LoginPopup onClose={() => setLoginVisible(false)} />
      )}

      {logoutVisible && user && (
        <LogoutPopup 
          onClose={() => setLogoutVisible(false)} 
          onConfirm={() => {
            logout();
            limparCarrinho();    
            setLogoutVisible(false); 
          }} 
        />
      )}
    </>
  );
};

export default Navbar;