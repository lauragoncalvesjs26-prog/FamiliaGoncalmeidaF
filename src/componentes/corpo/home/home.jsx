import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"
// API
import { API_URL } from "../../../api";

// áreas
import Header from "../../header/header";
import Aniversarios from "./aniversarios";
import Footer from "../../footer/footer";

export default function Home() {
  const navigate = useNavigate();

  const [podeVerDaniel, setPodeVerDaniel] = useState(false);

  useEffect(() => {
    const verificarPermissao = async () => {
      const logado = localStorage.getItem("logado");
      const token = localStorage.getItem("token");

      // =====================================================
      // VERIFICAR SE ESTÁ LOGADO
      // =====================================================

      if (logado !== "true" || !token) {
        navigate("/login");
        return;
      }

      try {
        // =====================================================
        // CHAMAR API DE PERMISSÕES
        // =====================================================

        const resposta = await fetch(`${API_URL}/eu/permissoes`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // =====================================================
        // TOKEN INVÁLIDO OU EXPIRADO
        // =====================================================

        if (resposta.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("logado");
          navigate("/login");
          return;
        }

        // =====================================================
        // ERRO NA API
        // =====================================================

        if (!resposta.ok) {
          throw new Error(
            `Erro na API de permissões: ${resposta.status}`
          );
        }

        // =====================================================
        // PEGAR RESPOSTA DA API
        // =====================================================

        const dados = await resposta.json();

        // =====================================================
        // DEFINIR PERMISSÃO DO DANIEL
        // =====================================================

        setPodeVerDaniel(dados.pode_ver_daniel === true);
      } catch (erro) {
        console.error("Erro ao consultar /eu/permissoes:", erro);

        // =====================================================
        // SE DER ERRO, NÃO MOSTRA DANIEL
        // =====================================================

        setPodeVerDaniel(false);
      }
    };

    verificarPermissao();
  }, [navigate]);

return (
  <div className="home-page">
    <Header />

    <main className="home">
      <section className="home-card">
        <div className="home-header">
          <h1>🏡 Bem-vindo à Página da Família Gonçalmeida</h1>

          <p>
            Este é um pequeno site criado para apresentar cada integrante da
            minha família. Clique em um dos botões abaixo para conhecer um
            pouco mais sobre cada pessoa e seus principais hobbies.
          </p>
        </div>

        <div className="home-botoes">

          {/* ==================== FAMÍLIA ==================== */}

          <section className="grupo-botoes familia-botoes">
            <div className="grupo-header">
              <span className="grupo-icone">👨‍👩‍👧‍👦</span>
              <h2>Família</h2>
            </div>

            <div className="lista-botoes">
              <a href="/laura" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">🎨</span>
                  <span>Laura</span>
                </button>
              </a>

              <a href="/amanda" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">📚</span>
                  <span>Amanda</span>
                </button>
              </a>

              <a href="/marcus" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">👤</span>
                  <span>Marcus</span>
                </button>
              </a>

              {podeVerDaniel && (
                <a href="/daniel" className="pessoa-link">
                  <button className="pessoa-botao">
                    <span className="pessoa-emoji">⚽</span>
                    <span>Daniel</span>
                  </button>
                </a>
              )}

              <a href="/ingrid" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">🦋</span>
                  <span>Ingrid</span>
                </button>
              </a>

              <a href="/kiba" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">🐺</span>
                  <span>Kiba</span>
                </button>
              </a>

              <a href="/nestor" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">🎩</span>
                  <span>Nestor</span>
                </button>
              </a>

              <a href="/cida" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">🌷</span>
                  <span>Cida</span>
                </button>
              </a>
            </div>
          </section>

          {/* ==================== AMIGOS ==================== */}

          <section className="grupo-botoes amigos-botoes">
            <div className="grupo-header">
              <span className="grupo-icone">🧑‍🤝‍🧑</span>
              <h2>Amigos</h2>
            </div>

            <div className="lista-botoes">
              <a href="/hector" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">💻</span>
                  <span>Hector</span>
                </button>
              </a>

              <a href="/katlen" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">✨</span>
                  <span>Katlen</span>
                </button>
              </a>

              <a href="/megan" className="pessoa-link">
                <button className="pessoa-botao">
                  <span className="pessoa-emoji">🌸</span>
                  <span>Megan</span>
                </button>
              </a>
            </div>
          </section>

        </div>
      </section>

      <section className="home-aniversarios">
        <Aniversarios podeVerDaniel={podeVerDaniel} />
      </section>
    </main>

    <Footer />
  </div>
);
}