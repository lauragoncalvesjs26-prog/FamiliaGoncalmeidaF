
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";
import { API_URL } from "../../../api";
import logoFamilia from "./logos/f.png";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Controla a exibição da tela de login
  const [mostrarLogin, setMostrarLogin] = useState(false);

  async function entrar(e) {

    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha o email e a senha.");
      return;
    }

    setCarregando(true);

    try {

      const resposta = await fetch(
        `${API_URL}/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email.trim(),
            senha: senha
          })
        }
      );

      const dados = await resposta.json();

      console.log("RESPOSTA COMPLETA DO LOGIN:", dados);
      console.log("TOKEN RECEBIDO:", dados.token);

      if (!resposta.ok) {

        alert(
          dados.detail ||
          "Email ou senha inválidos."
        );

        return;
      }

      localStorage.setItem("logado", "true");

      localStorage.setItem(
        "token",
        dados.token
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(dados.usuario)
      );

      navigate("/");

    } catch (erro) {

      console.error("Erro no login:", erro);

      alert("Erro ao conectar com o servidor.");

    } finally {

      setCarregando(false);
    }
  }

  return (

    <div className="login">

      {!mostrarLogin ? (

        /* ==================================
           PÁGINA PRINCIPAL DA FAMÍLIA
        ================================== */

        <main className="home-familia">

          <header className="home-header">

            <img
              src={logoFamilia}
              alt="Logo Família G.A."
              className="home-logo"
            />

            <h1>Família G.A.</h1>

            <p>
              Unida, louca e carinhosa.
            </p>

          </header>

          <section className="home-apresentacao">

            <h2>Bem-vindos à nossa família!</h2>

            <p>
              Somos uma família cheia de personalidade,
              carinho, histórias e momentos inesquecíveis.
            </p>

            <p>
              Aqui celebramos nossa união e guardamos
              as lembranças que fazem parte da nossa história.
            </p>

          </section>

          <section className="home-integrantes">

            <h2>Quem faz parte da nossa família</h2>

            <div className="integrantes-container">

              <article className="integrante">
                <h3>Amanda</h3>
                <p>Mãe</p>
              </article>

              <article className="integrante">
                <h3>Daniel</h3>
                <p>Padrasto</p>
              </article>

              <article className="integrante">
                <h3>Marcus</h3>
                <p>Pai</p>
              </article>

            </div>

          </section>

          <section className="home-historias">

            <h2>Nossas histórias</h2>

            <p>
              Fogueiras, reuniões familiares,
              risadas e muitos momentos juntos.
            </p>

            <p>
              Cada momento tem uma história,
              e cada história merece ser lembrada.
            </p>

          </section>

          <section className="home-acesso">

            <h2>Área da família</h2>

            <p>
              Entre na sua conta para acessar
              nosso espaço reservado.
            </p>

            <button
              type="button"
              onClick={() => setMostrarLogin(true)}
            >
              Acessar minha conta
            </button>

          </section>

          <footer className="home-footer">

            <p>
              Família G.A. — Feita de histórias e momentos.
            </p>

          </footer>

        </main>

      ) : (

        /* ==================================
           TELA DE LOGIN
        ================================== */

        <div className="login-container">

          <img
            src={logoFamilia}
            alt="Família G.A."
            className="home-logo"
          />

          <h1>Login</h1>

          <form onSubmit={entrar}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              required
            />

            <button
              type="submit"
              disabled={carregando}
            >
              {carregando
                ? "Entrando..."
                : "Entrar"
              }
            </button>

          </form>

          <button
            type="button"
            onClick={() => navigate("/cadastro")}
          >
            Não tenho conta, vou me cadastrar
          </button>

          <button
            type="button"
            onClick={() => setMostrarLogin(false)}
          >
            Voltar para a página inicial
          </button>

        </div>

      )}

    </div>

  );
}
