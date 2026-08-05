import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./home.css";

// areas
import Header from "../../header/header";
import Aniversarios from "./aniversarios";
import Footer from "../../footer/footer";

export default function Home() {

  const navigate = useNavigate();

  useEffect(() => {

    const logado = localStorage.getItem("logado");

    if (logado !== "true") {
      navigate("/login");
    }

  }, [navigate]);

  return (
    <div className="geral">

      <Header />

      <section className="home">
        <div className="home-card">

          <h1>🏡 Bem-vindo à Página da Família Gonçalmeida</h1>

          <p>
            Este é um pequeno site criado para apresentar cada integrante da
            minha família. Clique em um dos botões abaixo para conhecer um pouco
            mais sobre cada pessoa e seus principais hobbies.
          </p>

          <div className="home-botoes">

            <div className="familia-botoes">

              <h2>Família</h2>

              <a href="/laura">
                <button>🎨 Laura</button>
              </a>

              <a href="/amanda">
                <button>📚 Amanda</button>
              </a>

              <a href="/daniel">
                <button>⚽ Daniel</button>
              </a>

              <a href="/ingrid">
                <button>🦋 Ingrid</button>
              </a>

              <a href="/kiba">
                <button>🐺 Kiba</button>
              </a>

              <a href="/nestor">
                <button>Nestor</button>
              </a>

              <a href="/cida">
                <button>Cida</button>
              </a>

            </div>

            <div className="amigos-botoes">

              <h2>Amigos</h2>

              <a href="/hector">
                <button>💻 Hector</button>
              </a>

              <a href="/katlen">
                <button>Katlen</button>
              </a>

              <a href="/megan">
                <button>Megan</button>
              </a>

            </div>

          </div>

        </div>
      </section>

      <Aniversarios />

      <Footer />

    </div>
  );
}