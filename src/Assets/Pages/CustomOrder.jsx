import React, { useState } from "react";
import "../Styles/Pages/CustomOrder.css";

const CustomOrder = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pieceDescription, setPieceDescription] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const closePopups = () => {
    setCartOpen(false);
    setLoginOpen(false);
    setSidebarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pedido enviado com sucesso!");
    setName(""); setEmail(""); setPhone(""); setPieceDescription(""); setAdditionalNotes("");
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="custom-container" onClick={closePopups}>
      {/* Navbar */}
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <button className="menu-button" onClick={() => setSidebarOpen(true)}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="logo">Custom Order</div>
        <div className="nav-icons">
          <button onClick={(e) => { e.stopPropagation(); setCartOpen(!isCartOpen); setLoginOpen(false); }}>
            <i className="fas fa-shopping-cart"></i>
          </button>
          <button onClick={(e) => { e.stopPropagation(); setLoginOpen(!isLoginOpen); setCartOpen(false); }}>
            <i className="fas fa-user"></i>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`sidebar ${isSidebarOpen ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <a href="/" className="sidebar-link">Home</a>
          <a href="/store" className="sidebar-link">Store</a>
          <a href="/custom" className="sidebar-link">Custom Order</a>
        </nav>
      </div>

      {/* Cart Popup */}
      {isCartOpen && (
        <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
          <p className="cart-text">Faça login para ver os produtos adicionados ao carrinho.</p>
          <button className="cart-close" onClick={() => setCartOpen(false)}>Fechar</button>
        </div>
      )}

      {/* Login Popup */}
      {isLoginOpen && (
        <div className="login-popup" onClick={(e) => e.stopPropagation()}>
          <h2 className="login-title">Entrar na Conta</h2>
          <div className="login-group">
            <label>Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
            />
          </div>
          <div className="login-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          <button className="login-submit">Entrar</button>
          <button onClick={handleCloseLogin} className="login-close">Fechar</button>
        </div>
      )}

      {/* Conteúdo principal */}
      <main className="custom-main" onClick={(e) => e.stopPropagation()}>
        <h1 className="custom-title">Peça Personalizada</h1>
        <p className="custom-description">Preencha o formulário abaixo com os detalhes do seu pedido personalizado.</p>

        <form onSubmit={handleSubmit} className="custom-form">
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Descrição da Peça</label>
            <textarea
              value={pieceDescription}
              onChange={(e) => setPieceDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Notas Adicionais</label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
          </div>
          <button type="submit" className="custom-submit">Enviar Pedido</button>
        </form>
      </main>
    </div>
  );
};

export default CustomOrder;
