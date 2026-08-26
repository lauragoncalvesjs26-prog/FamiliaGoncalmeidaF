import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { API_URL } from "../../../api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

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

      localStorage.setItem(
  "logado",
  "true"
);

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

      console.error(
        "Erro no login:",
        erro
      );

      alert(
        "Erro ao conectar com o servidor."
      );

    } finally {

      setCarregando(false);
    }
  }

  return (

    <div className="login">

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
        onClick={() =>
          navigate("/cadastro")
        }
      >
        Não tenho conta, vou me cadastrar
      </button>

    </div>
  );
}