import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        <div className="footer-brand">

          <div className="footer-logo">
            🏡
          </div>

          <div>
            <h3>Família Gonçalmeida</h3>

            <p>
              Um cantinho para guardar nossas histórias,
              pessoas e momentos especiais.
            </p>
          </div>

        </div>

        <div className="footer-links">

          <h4>Navegação</h4>

          <Link to="/">
            Início
          </Link>

          <Link to="/laura">
            Conheça a família
          </Link>

        </div>

        <div className="footer-message">

          <h4>Feito com carinho ❤️</h4>

          <p>
            Este site foi criado para celebrar
            cada integrante da nossa família.
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Família Gonçalmeida.
          Todos os direitos reservados.
        </p>

      </div>

    </footer>
  );
}