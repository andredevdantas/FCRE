import React, { useState } from "react";

const LoginPopup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClose = () => {
    onClose();
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-popup" onClick={(e) => e.stopPropagation()}>
      <h2>Entrar na Conta</h2>
      <div className="login-group">
        <label htmlFor="popup-username">Usuário</label>
        <input 
          id="popup-username" 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Digite seu usuário" 
        />
      </div>
      <div className="login-group">
        <label htmlFor="popup-password">Senha</label>
        <input 
          id="popup-password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Digite sua senha" 
        />
      </div>
      <button className="login-submit">Entrar</button>
      <button className="login-close-text" onClick={handleLoginClose}>
        Cancelar
      </button>
    </div>
  );
};

export default LoginPopup;