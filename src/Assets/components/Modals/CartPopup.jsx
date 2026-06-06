import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; 

const CartPopup = ({ cartItems, removerDoCarrinho, totalCarrinho, onOpenLogin, onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  return (
    <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
      <h3>Seu Carrinho</h3>
      
      {cartItems.length === 0 ? (
        <>
          {!user ? (
            <>
              <p>Faça login ou adicione produtos para ver seu carrinho.</p>
              <div className="popup-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                <button className="btn-primary" onClick={onOpenLogin}>
                  Entrar agora
                </button>
                <button className="btn-link" onClick={onClose}>Fechar</button>
              </div>
            </>
          ) : (
            <>
              <p style={{ margin: '16px 0', color: '#555' }}>
                Seu carrinho está vazio, {user.nome}! Que tal dar uma olhada nas novidades da loja?
              </p>
              <div className="popup-actions" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    onClose();
                    navigate("/store");
                  }}
                >
                  Ir para a Loja
                </button>
                <button className="btn-link" onClick={onClose}>Fechar</button>
              </div>
            </>
          )}
        </>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.nome}</span>
              <div className="cart-item-actions">
                <span>R$ {item.preco.toFixed(2)}</span>
                <button onClick={() => removerDoCarrinho(index)} className="cart-remove">
                  Remover
                </button>
              </div>
            </li>
          ))}
          <li className="cart-total">Total: R$ {totalCarrinho}</li>
          
          <button 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '16px' }} 
            onClick={() => {
              onClose(); 
              navigate("/checkout"); 
            }}
          >
            Finalizar Compra
          </button>
          
          <button className="btn-link" style={{ width: '100%', marginTop: '8px' }} onClick={onClose}>
            Continuar Comprando
          </button>
        </ul>
      )}
    </div>
  );
};

export default CartPopup;