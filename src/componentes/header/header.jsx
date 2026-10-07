import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./header.css";
import { API_URL } from "../../api";

export default function Header() {
  const navigate = useNavigate();

  const [podeAcessarPainel, setPodeAcessarPainel] = useState(false);

  const usuarioSalvo = localStorage.getItem("usuario");

  const usuario = usuarioSalvo
    ? JSON.parse(usuarioSalvo)
    : null;

  // =========================================================
  // VERIFICAR PERMISSÃO DO PAINEL
  // =========================================================
  useEffect(() => {
    async function verificarAcessoPainel() {
      const token = localStorage.getItem("token");

      // Sem token, não mostra o botão
      if (!token) {
        setPodeAcessarPainel(false);
        return;
      }

      try {
        const resposta = await fetch(
          `${API_URL}/painel/acesso`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // =====================================================
        // AUTORIZADO
        // =====================================================
        if (resposta.ok) {
          const dados = await resposta.json();

          setPodeAcessarPainel(
            dados.autorizado === true
          );

          return;
        }

        // =====================================================
        // SEM PERMISSÃO
        // =====================================================
        if (resposta.status === 403) {
          setPodeAcessarPainel(false);
          return;
        }

        // =====================================================
        // TOKEN INVÁLIDO OU EXPIRADO
        // =====================================================
        if (resposta.status === 401) {
          setPodeAcessarPainel(false);
          return;
        }

        // Qualquer outro erro
        setPodeAcessarPainel(false);

      } catch (erro) {
        console.error(
          "Erro ao verificar acesso ao painel:",
          erro
        );

        setPodeAcessarPainel(false);
      }
    }

    verificarAcessoPainel();
  }, []);

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

        {/* ===================================================
            LOGO
        =================================================== */}

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

        {/* ===================================================
            NAVEGAÇÃO
        =================================================== */}

        <nav className="header-nav">

          {/* =================================================
              USUÁRIO LOGADO
          ================================================= */}

          {usuario && (
            <span className="usuario-logado">
              👤 {usuario.nome} {usuario.sobrenome}
            </span>
          )}

          {/* =================================================
              INÍCIO
          ================================================= */}

          <Link
            to="/"
            className="nav-link"
          >
            Início
          </Link>

          {/* =================================================
              SOBRE
          ================================================= */}

          <Link
            to="/sobre"
            className="nav-link"
          >
            Sobre
          </Link>

          {/* =================================================
              PAINEL
              
              O botão só aparece se o BACKEND retornar:
              
              {
                "autorizado": true
              }
          ================================================= */}

          {podeAcessarPainel && (
            <Link
              to="/painel"
              className="nav-link"
            >
              Painel
            </Link>
          )}

          {/* =================================================
              MENU FAMÍLIA
          ================================================= */}

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

          {/* =================================================
              LOGOUT
          ================================================= */}

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