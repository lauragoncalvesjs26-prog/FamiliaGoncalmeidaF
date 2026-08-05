import React from "react";
import "./daniel.css"
import Voltar from "../geral/voltar";

export default function Daniel() {
  return (
    <section className="daniel">
      <div className="daniel-card">
        <h1>Daniel</h1>

        <h2>⚽ Apaixonado por Futebol</h2>

        <p>
          Meu nome é Daniel e o futebol faz parte da minha vida.
          Gosto de jogar com os amigos, treinar novos fundamentos e aproveitar
          cada partida para melhorar minhas habilidades dentro de campo.
        </p>

        <p>
          Além da diversão, o futebol me ensina a trabalhar em equipe,
          respeitar os adversários e nunca desistir dos meus objetivos.
          Cada jogo é uma nova oportunidade para aprender e evoluir.
        </p>

        <div className="daniel-botoes">
          <button>⚽ Ver Partidas</button>
          <button>🏆 Meus Títulos</button>
          <br />
          <Voltar />
        </div>
      </div>
    </section>
  )
}