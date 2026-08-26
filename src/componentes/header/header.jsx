import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

export default function Header() {

  const navigate = useNavigate();

  const usuarioSalvo = localStorage.getItem("usuario");

  const usuario = usuarioSalvo
    ? JSON.parse(usuarioSalvo)
    : null;


  // =========================================================
  // LOGOUT
  // =========================================================

  function logout() {

    localStorage.removeItem("logado");

    localStorage.removeItem("usuario");

    localStorage.removeItem("token");

    navigate("/login");
  }


  return (

    <header className="site-header">

      <div className="header-container">

        <Link
          to="/"
          className="logo"
        >

          <span className="logo-icon">
            🏡
          </span>

          <div className="logo-text">

            <strong>
              Família Gonçalmeida
            </strong>

            <span>
              Nosso cantinho
            </span>

          </div>

        </Link>


        <nav className="header-nav">


          {usuario && (

            <span className="usuario-logado">

              👤 {usuario.nome} {usuario.sobrenome}

            </span>

          )}


          <Link
            to="/"
            className="nav-link"
          >
            Início
          </Link>


          <Link
            to="/sobre"
            className="nav-link"
          >
            Sobre
          </Link>


          {/* =================================================
              PAINEL
              A AUTORIZAÇÃO É FEITA NO BACKEND
          ================================================= */}

          <Link
            to="/painel"
            className="nav-link"
          >
            Painel
          </Link>


          <div className="nav-dropdown">

            <span className="nav-link dropdown-title">
              Família ▾
            </span>

            <div className="dropdown-menu">

              <Link to="/laura">
                🎨 Laura
              </Link>

              <Link to="/amanda">
                📚 Amanda
              </Link>

              <Link to="/daniel">
                ⚽ Daniel
              </Link>

              <Link to="/hector">
                💻 Hector
              </Link>

              <Link to="/kiba">
                🐺 Kiba
              </Link>

              <Link to="/nestor">
                Nestor
              </Link>

              <Link to="/cida">
                Cida
              </Link>

              <Link to="/katlen">
                Katlen
              </Link>

              <Link to="/megan">
                Megan
              </Link>

              <Link to="/ingrid">
                Ingrid
              </Link>

            </div>

          </div>


          <button
            className="logout-btn"
            onClick={logout}
          >
            🚪 Sair
          </button>


        </nav>

      </div>

    </header>

  );
}