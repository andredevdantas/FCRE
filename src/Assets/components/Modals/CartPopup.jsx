import React from "react";

const CartPopup = ({ cartItems, removerDoCarrinho, totalCarrinho, onOpenLogin, onClose }) => {
  return (
    <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
      <h3>Seu Carrinho</h3>
      
      {cartItems.length === 0 ? (
        <>
          <p>Faça login ou adicione produtos para ver seu carrinho.</p>
          <div className="popup-actions">
            <button className="btn-primary" onClick={onOpenLogin}>
              Entrar agora
            </button>
            <button className="btn-link" onClick={onClose}>Fechar</button>
          </div>
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
          <button className="btn-link" style={{ width: '100%', marginTop: '12px' }} onClick={onClose}>
            Fechar Carrinho
          </button>
        </ul>
      )}
    </div>
  );
};

export default CartPopup;