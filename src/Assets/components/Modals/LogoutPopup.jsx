import React from "react";

const LogoutPopup = ({ onConfirm, onClose }) => {
  return (
    <div className="login-popup" onClick={(e) => e.stopPropagation()}>
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>Sair da Conta</h2>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "24px", fontSize: "15px" }}>
        Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar seu carrinho.
      </p>
      
      <div style={{ display: "flex", gap: "12px" }}>
        <button 
          className="btn-outline" 
          onClick={onClose} 
          style={{ flex: 1, padding: "12px", borderRadius: "6px" }}
        >
          Cancelar
        </button>
        <button 
          className="btn-primary" 
          onClick={onConfirm} 
          style={{ flex: 1, padding: "12px", borderRadius: "6px", backgroundColor: "#dc2626" }}
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default LogoutPopup;