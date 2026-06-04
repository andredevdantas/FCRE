import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/components/Navbar.css";
import CartButton from "./CartButton.jsx";
import LoginButton from "./LoginButton.jsx";
import CartPopup from "./CartPopup.jsx";
import LoginPopup from "./LoginPopup.jsx";

const Navbar = ({ cartItems = [], removerDoCarrinho, totalCarrinho }) => {
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
          <CartButton 
            cartCount={cartItems.length} 
            onClick={(e) => {
              e.stopPropagation();
              setCartVisible(!cartVisible);
              setLoginVisible(false); 
            }} 
          />
          <LoginButton 
            onClick={(e) => {
              e.stopPropagation();
              setLoginVisible(!loginVisible);
              setCartVisible(false); 
            }} 
          />
        </div>
      </nav>

      {(cartVisible || loginVisible) && (
        <div className="popup-overlay" onClick={() => { setCartVisible(false); setLoginVisible(false); }}></div>
      )}

      {cartVisible && (
        <CartPopup 
          cartItems={cartItems}
          removerDoCarrinho={removerDoCarrinho}
          totalCarrinho={totalCarrinho}
          onClose={() => setCartVisible(false)}
          onOpenLogin={() => {
            setCartVisible(false); 
            setLoginVisible(true); 
          }}
        />
      )}

      {loginVisible && (
        <LoginPopup onClose={() => setLoginVisible(false)} />
      )}
    </>
  );
};

export default Navbar;