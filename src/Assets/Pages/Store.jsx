import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Store.css";

const roupas = [
  { id: 1, nome: "Camiseta Oversized", preco: 89.9, imagem: "/IMG/Store/Oversized.jpeg" },
  { id: 2, nome: "Jaqueta Jeans", preco: 199.9, imagem: "/IMG/Store/Jaqueta.jpg" },
  { id: 3, nome: "Calça Cargo", preco: 149.9, imagem: "/IMG/Store/Cargo.jpeg" },
  { id: 4, nome: "Moletom Canguru", preco: 129.9, imagem: "/IMG/Store/Moletom.png" },
];

const Store = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sidebarRef = useRef(null);
  const cartRef = useRef(null);
  const loginRef = useRef(null);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
      if (showCart && cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
      if (showLogin && loginRef.current && !loginRef.current.contains(e.target)) {
        setShowLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, showCart, showLogin]);

  const handleLoginClose = () => {
    setShowLogin(false);
    setUsername("");
    setPassword("");
  };

  const adicionarAoCarrinho = (produto) => {
    setCart((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCarrinho = cart.reduce((acc, item) => acc + item.preco, 0).toFixed(2);

  return (
    <div className="store-container">
      {/* Navbar */}
      <nav className="navbar">
        <button
          className="menu-button"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(true);
          }}
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="logo">Store</div>
        <div className="nav-icons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCart(!showCart);
              setShowLogin(false);
            }}
          >
            <i className="fas fa-shopping-cart"></i>
            {cart.length > 0 && <span className="cart-count">({cart.length})</span>}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowLogin(!showLogin);
              setShowCart(false);
            }}
          >
            <i className="fas fa-user"></i>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "show" : ""}`}
      >
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link">Home</Link>
          <Link to="/store" className="sidebar-link">Store</Link>
          <Link to="/custom" className="sidebar-link">Custom Order</Link>
        </nav>
      </div>

      {/* Carrinho */}
      {showCart && (
        <div ref={cartRef} className="cart-popup">
          <h3 className="cart-title">Carrinho de Compras</h3>
          {cart.length === 0 ? (
            <p className="cart-empty">Seu carrinho está vazio.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={index} className="cart-item">
                  <span>{item.nome}</span>
                  <div className="cart-item-actions">
                    <span>R$ {item.preco.toFixed(2)}</span>
                    <button
                      onClick={() => removerDoCarrinho(index)}
                      className="cart-remove"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
              <li className="cart-total">
                Total: R$ {totalCarrinho}
              </li>
            </ul>
          )}
          <button
            onClick={() => setShowCart(false)}
            className="cart-close"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Login */}
      {showLogin && (
        <div ref={loginRef} className="login-popup">
          <h2 className="login-title">Entrar na Conta</h2>
          <div className="login-group">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Digite seu usuário"
            />
          </div>
          <div className="login-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Digite sua senha"
            />
          </div>
          <button className="login-submit">Entrar</button>
          <button
            onClick={handleLoginClose}
            className="login-close"
          >
            Fechar
          </button>
        </div>
      )}

      {/* Produtos */}
      <main className="products-section">
        <h1 className="products-title">Loja de Roupas</h1>
        <div className="products-grid">
          {roupas.map((produto) => (
            <div key={produto.id} className="product-card">
              <img src={produto.imagem} alt={produto.nome} />
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
