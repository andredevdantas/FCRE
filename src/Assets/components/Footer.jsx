import React from "react";
import { Link } from "react-router-dom";
import "../Styles/components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-newsletter">
        <div className="newsletter-content">
          <h3>Junte-se ao nosso Clube Exclusivo</h3>
          <p>Receba novidades sobre coleções, editoriais e acesso antecipado a promoções.</p>
        </div>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Obrigado por se inscrever!"); }}>
          <input type="email" placeholder="Seu endereço de e-mail" required />
          <button type="submit">Inscrever-se</button>
        </form>
      </div>

      <div className="footer-main">
        <div className="footer-brand">
          <h2>FCER</h2>
          <p>Redefinindo o estilo contemporâneo com peças atemporais projetadas para versatilidade, conforto e sofisticação desde 2024.</p>
        </div>

        <div className="footer-links-group">
          <div className="footer-column">
            <h4>Navegação</h4>
            <Link to="/">Início</Link>
            <Link to="/store">Nossa Loja</Link>
            <Link to="/coupons">Benefícios e Cupons</Link>
          </div>

          <div className="footer-column">
            <h4>Atendimento</h4>
            <a href="#faq">Perguntas Frequentes</a>
            <a href="#trocas">Trocas e Devoluções</a>
            <a href="#contato">Fale Conosco</a>
          </div>

          <div className="footer-column">
            <h4>Redes Sociais</h4>
            <div className="social-icons">
              <a href="#instagram" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#tiktok" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
              <a href="#pinterest" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FCER. Todos os direitos reservados.</p>
        <div className="payment-methods">
          <i className="fab fa-cc-visa"></i>
          <i className="fab fa-cc-mastercard"></i>
          <i className="fab fa-cc-amex"></i>
          <i className="fab fa-pix"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;