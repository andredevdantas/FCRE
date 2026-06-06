import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Pages/Checkout.css";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, totalCarrinho, limparCarrinho } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [metodoPagamento, setMetodoPagamento] = useState("cartao");
  const [isProcessing, setIsProcessing] = useState(false);

  const [dadosEntrega, setDadosEntrega] = useState({
    endereco: "",
    cidade: "",
    cep: "",
  });

  const [dadosPagamento, setDadosPagamento] = useState({
    numeroCartao: "",
    nomeCartao: "",
    validade: "",
    cvv: "",
  });

  const aplicarMascaraCEP = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 9);
  };

  const aplicarMascaraCartao = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .replace(/(\d{4})(\d)/, "$1 $2")
      .substring(0, 19);
  };

  const aplicarMascaraValidade = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .substring(0, 5);
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert(`Pagamento processado com sucesso! Obrigado pela compra, ${user?.nome || "Cliente"}.`);
      limparCarrinho();
      navigate("/");
    }, 3000);
  };

  return (
    <div className="checkout-page">
      <Navbar />

      <div className="simulation-banner">
        <i className="fas fa-info-circle"></i> Ambiente de Simulação Seguro. Nenhum dado real é armazenado ou processado.
      </div>

      <main className="checkout-container">
        <h1 className="checkout-title">Finalizar Pedido</h1>

        {cart.length === 0 ? (
          <div className="empty-checkout">
            <p>Seu carrinho está vazio.</p>
            <button className="btn-voltar" onClick={() => navigate("/store")}>
              Voltar para a Loja
            </button>
          </div>
        ) : (
          <div className="checkout-content">
            
            <div className="checkout-main-column">
              <form onSubmit={handleFinalizarCompra} className="checkout-form">
                
                <section className="form-section">
                  <h2><i className="fas fa-map-marker-alt"></i> 1. Endereço de Entrega</h2>
                  
                  <div className="input-row">
                    <div className="input-group cep-group">
                      <label>CEP</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="00000-000"
                        value={dadosEntrega.cep}
                        onChange={(e) => setDadosEntrega({...dadosEntrega, cep: aplicarMascaraCEP(e.target.value)})}
                      />
                    </div>
                    <div className="input-group cidade-group">
                      <label>Cidade</label>
                      <input 
                        type="text" 
                        required 
                        value={dadosEntrega.cidade}
                        onChange={(e) => setDadosEntrega({...dadosEntrega, cidade: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Endereço Completo</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Rua, Número, Complemento, Bairro"
                      value={dadosEntrega.endereco}
                      onChange={(e) => setDadosEntrega({...dadosEntrega, endereco: e.target.value})}
                    />
                  </div>
                </section>

                <section className="form-section">
                  <h2><i className="fas fa-credit-card"></i> 2. Forma de Pagamento</h2>
                  
                  <div className="payment-tabs">
                    <button 
                      type="button"
                      className={`tab-btn ${metodoPagamento === "cartao" ? "active" : ""}`}
                      onClick={() => setMetodoPagamento("cartao")}
                    >
                      <i className="fas fa-credit-card"></i> Cartão de Crédito
                    </button>
                    <button 
                      type="button"
                      className={`tab-btn ${metodoPagamento === "pix" ? "active" : ""}`}
                      onClick={() => setMetodoPagamento("pix")}
                    >
                      <i className="fab fa-pix"></i> Pix Dinâmico
                    </button>
                  </div>

                  {metodoPagamento === "cartao" ? (
                    <div className="credit-card-form">
                      <div className="input-group">
                        <label>Número do Cartão</label>
                        <div className="input-with-icon">
                          <input 
                            type="text" 
                            required={metodoPagamento === "cartao"}
                            placeholder="0000 0000 0000 0000"
                            value={dadosPagamento.numeroCartao}
                            onChange={(e) => setDadosPagamento({...dadosPagamento, numeroCartao: aplicarMascaraCartao(e.target.value)})}
                          />
                          <i className="fas fa-lock card-input-lock"></i>
                        </div>
                      </div>

                      <div className="input-group">
                        <label>Nome Impresso no Cartão</label>
                        <input 
                          type="text" 
                          required={metodoPagamento === "cartao"}
                          placeholder="JOÃO B SILVA"
                          value={dadosPagamento.nomeCartao}
                          onChange={(e) => setDadosPagamento({...dadosPagamento, nomeCartao: e.target.value.toUpperCase()})}
                        />
                      </div>

                      <div className="input-row">
                        <div className="input-group">
                          <label>Validade</label>
                          <input 
                            type="text" 
                            required={metodoPagamento === "cartao"}
                            placeholder="MM/AA"
                            value={dadosPagamento.validade}
                            onChange={(e) => setDadosPagamento({...dadosPagamento, validade: aplicarMascaraValidade(e.target.value)})}
                          />
                        </div>
                        <div className="input-group">
                          <label>CVC / CVV</label>
                          <input 
                            type="text" 
                            required={metodoPagamento === "cartao"}
                            placeholder="123"
                            maxLength="3"
                            value={dadosPagamento.cvv}
                            onChange={(e) => setDadosPagamento({...dadosPagamento, cvv: e.target.value.replace(/\D/g, "")})}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pix-instruction">
                      <div className="pix-qr-mock">
                        <i className="fas fa-qrcode"></i>
                      </div>
                      <p>O código QR Code dinâmico e a chave "Copia e Cola" serão gerados assim que você clicar em confirmar.</p>
                      <span>Aprovação instantânea e 5% de desconto ativo.</span>
                    </div>
                  )}
                </section>

                <button type="submit" className="btn-confirmar" disabled={isProcessing}>
                  {isProcessing ? (
                    <span className="spinner-container">
                      <i className="fas fa-circle-notch fa-spin"></i> Processando Transação Autenticada...
                    </span>
                  ) : (
                    metodoPagamento === "cartao" ? "Autorizar Pagamento Seguro" : "Gerar Código Pix Seguro"
                  )}
                </button>
              </form>

              <div className="security-badges-container">
                <div className="badge-item">
                  <i className="fas fa-shield-alt"></i>
                  <span>Ambiente Criptografado SSL</span>
                </div>
                <div className="badge-item">
                  <i className="fas fa-check-circle"></i>
                  <span>PCI-DSS Compliant certified</span>
                </div>
                <div className="badge-item">
                  <i className="fas fa-user-shield"></i>
                  <span>Proteção Antifraude Ativa</span>
                </div>
              </div>
            </div>

            <aside className="checkout-summary">
              <h2>Resumo da Compra</h2>
              <div className="summary-items">
                {cart.map((item, index) => (
                  <div key={index} className="summary-item">
                    <div className="summary-item-info">
                      <img src={item.imagem} alt={item.nome} />
                      <span className="summary-item-name">{item.nome}</span>
                    </div>
                    <span className="summary-item-price">R$ {item.preco.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="totals-row">
                  <span>Subtotal</span>
                  <span>R$ {totalCarrinho}</span>
                </div>
                <div className="totals-row">
                  <span>Frete Logístico</span>
                  <span className="free-shipping">Grátis</span>
                </div>
                {metodoPagamento === "pix" && (
                  <div className="totals-row pix-discount-row">
                    <span>Desconto Pix (5%)</span>
                    <span>- R$ {(parseFloat(totalCarrinho) * 0.05).toFixed(2)}</span>
                  </div>
                )}
                <div className="totals-row total-final">
                  <span>Total a Pagar</span>
                  <span>
                    R$ {metodoPagamento === "pix" 
                      ? (parseFloat(totalCarrinho) * 0.95).toFixed(2) 
                      : totalCarrinho}
                  </span>
                </div>
              </div>
            </aside>

          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;