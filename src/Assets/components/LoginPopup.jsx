import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPopup = ({ onClose }) => {
  const { login } = useAuth(); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (username.trim() === "") return;
    
    login(username);
    onClose(); 
  };

  return (
    <div className="login-popup" onClick={(e) => e.stopPropagation()}>
      <h2>Entrar na Conta</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-group">
          <label htmlFor="popup-username">Usuário</label>
          <input 
            id="popup-username" 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Digite seu usuário" 
            required
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
            required
          />
        </div>
        <button type="submit" className="login-submit">Entrar</button>
      </form>
      <button type="button" className="login-close-text" onClick={onClose}>
        Cancelar
      </button>
    </div>
  );
};

export default LoginPopup;