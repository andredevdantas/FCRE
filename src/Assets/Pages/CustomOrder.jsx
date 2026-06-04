import React, { useState } from "react";
import "../Styles/Pages/CustomOrder.css";
import Navbar from "../components/Navbar.jsx"; 

const CustomOrder = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pieceDescription, setPieceDescription] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pedido enviado com sucesso!");
    setName(""); 
    setEmail(""); 
    setPhone(""); 
    setPieceDescription(""); 
    setAdditionalNotes("");
  };

  return (
    <div className="custom-container">
      <Navbar />
      <main className="custom-main">
        <h1 className="custom-title">Peça Personalizada</h1>
        <p className="custom-description">
          Preencha o formulário abaixo com os detalhes do seu pedido personalizado.
        </p>

        <form onSubmit={handleSubmit} className="custom-form">
          <div className="form-group">
            <label htmlFor="custom-name">Nome</label>
            <input
              id="custom-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="custom-email">Email</label>
            <input
              id="custom-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="custom-phone">Telefone</label>
            <input
              id="custom-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="custom-desc">Descrição da Peça</label>
            <textarea
              id="custom-desc"
              value={pieceDescription}
              onChange={(e) => setPieceDescription(e.target.value)}
              placeholder="Descreva cores, tamanhos, tecidos ou ideias para sua peça..."
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="custom-notes">Notas Adicionais</label>
            <textarea
              id="custom-notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Alguma observação extra?"
            />
          </div>
          
          <button type="submit" className="custom-submit">Enviar Pedido</button>
        </form>
      </main>
    </div>
  );
};

export default CustomOrder;