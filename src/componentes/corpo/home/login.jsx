import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"
import { API_URL } from "../../../api";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");

  async function entrar(e) {

    e.preventDefault();

    try {

      const resposta = await fetch(
        `${API_URL}/login`
        ,
        
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            senha
          })
        }
      );

      if (!resposta.ok) {

        alert("Email ou senha inválidos.");

        return;
      }

      const dados = await resposta.json();

      localStorage.setItem("logado", "true");

      localStorage.setItem(
        "usuario",
        JSON.stringify(dados.usuario)
      );

      navigate("/");

    } catch (erro) {

      console.error(erro);

      alert("Erro ao conectar com o servidor.");

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
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Entrar
        </button>

      </form>

    </div>

  );

}