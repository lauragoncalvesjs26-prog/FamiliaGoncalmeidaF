import React from "react";

import "./marcus.css";

import Voltar from "../geral/voltar";

export default function Marcus() {
  return (
    <section className="marcus">
      <div className="marcus-card">

        <h1>Marcus</h1>

        <h2>🏗️ Apaixonado por Máquinas de Construção</h2>

        <p>
          Meu nome é Marcus e trabalho com aluguel de máquinas para
          construção. Gosto desse ramo porque posso ajudar empresas e
          profissionais a encontrarem os equipamentos certos para cada obra.
        </p>

        <p>
          Trabalhar com máquinas de construção exige responsabilidade,
          dedicação e experiência. Cada equipamento tem sua função e pode
          fazer a diferença para tornar o trabalho mais rápido e eficiente.
        </p>

        <div className="marcus-botoes">
          <button>🚜 Ver Máquinas</button>
          <button>🏗️ Minhas Obras</button>

          <br />

          <Voltar />
        </div>

      </div>
    </section>
  );
}