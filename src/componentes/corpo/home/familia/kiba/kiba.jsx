import React from "react";
import "./kiba.css"
import Voltar from "../geral/voltar";

export default function Kiba() {
  return (
    <section className="kiba">
      <div className="kiba-card">
        <h1>🐶 Kiba</h1>

        <h2>Meu companheiro de aventuras</h2>

        <p>
          Kiba é um cachorro muito alegre, brincalhão e cheio de energia.
          Ele adora correr, passear e explorar novos lugares. Cada caminhada
          é uma grande aventura para ele.
        </p>

        <p>
          Além de ser um excelente companheiro, Kiba gosta de brincar com
          bolinhas, receber carinho e passar tempo com a família. Sua alegria
          torna qualquer dia muito mais divertido.
        </p>

        <div className="kiba-botoes">
          <button>🐾 Ver Aventuras</button>
          <button>🦴 Brincadeiras Favoritas</button>
          <br /> <Voltar />
        </div>
      </div>
    </section>
  )
}