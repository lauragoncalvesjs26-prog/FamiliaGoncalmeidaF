import React from "react";
import "./hector.css"
import Voltar from "../geral/voltar";

export default function Hector() {
  return (
    <section className="hector">
      <div className="hector-card">
        <h1>Hector</h1>

        <h2>💻 Apaixonado por Tecnologia e Música 🎵</h2>

        <p>
          Meu nome é Hector e gosto muito de estudar tecnologia.
          Tenho interesse por programação, computadores, inteligência
          artificial e tudo o que envolve inovação e desenvolvimento de
          novas soluções.
        </p>

        <p>
          Além da tecnologia, a música também faz parte do meu dia a dia.
          Gosto de ouvir diferentes estilos musicais para relaxar,
          aumentar a concentração e aproveitar os momentos de lazer.
        </p>

        <div className="hector-botoes">
          <button>💻 Tecnologias Favoritas</button>
          <button>🎵 Minhas Músicas</button>
          <br /> <Voltar />
        </div>
      </div>
    </section>
  )
}