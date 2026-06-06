import React, { useState } from "react";
import "../Styles/Pages/Coupons.css";
import Navbar from "../components/Navbar";

const Coupons = () => {
  const [copiado, setCopiado] = useState(null);

  const listaCupons = [
    {
      id: 1,
      codigo: "BEMVINDO20",
      titulo: "Especial Primeira Compra",
      descricao: "Ganhe 20% de desconto no seu primeiro pedido em nossa loja.",
      validade: "Válido para novos clientes"
    },
    {
      id: 2,
      codigo: "FCER10",
      titulo: "Benefício Exclusivo",
      descricao: "Aplique 10% de desconto em qualquer peça da nova coleção.",
      validade: "Tempo Limitado"
    }
  ];

  const handleCopiarCodigo = (codigo) => {
    navigator.clipboard.writeText(codigo);
    setCopiado(codigo);
    setTimeout(() => {
      setCopiado(null);
    }, 2000);
  };

  return (
    <div className="coupons-page">
      <Navbar />

      <main className="coupons-container">
        <div className="coupons-header">
          <h1>Cupons e Benefícios</h1>
          <p>Resgate seus códigos promocionais e utilize na etapa de pagamento.</p>
        </div>

        <div className="coupons-grid">
          {listaCupons.map((cupom) => (
            <div key={cupom.id} className="coupon-card">
              <div className="coupon-content">
                <h2>{cupom.titulo}</h2>
                <p>{cupom.descricao}</p>
                <span className="coupon-validity"><i className="far fa-clock"></i> {cupom.validade}</span>
              </div>
              <div className="coupon-action">
                <div className="coupon-code-box">
                  {cupom.codigo}
                </div>
                <button 
                  className={`btn-copiar ${copiado === cupom.codigo ? "copiado" : ""}`}
                  onClick={() => handleCopiarCodigo(cupom.codigo)}
                >
                  {copiado === cupom.codigo ? "Código Copiado!" : "Copiar Código"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Coupons;