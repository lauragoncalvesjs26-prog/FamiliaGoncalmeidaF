import React from "react";
import "./cida.css"
import Voltar from "../geral/voltar";

export default function Cida() {
  return (
    <section className="cida">
      <div className="cida-card">
        <h1>👵 Cida</h1>

        <h2>❤️ Amor, Carinho e União da Família</h2>

        <p>
          Meu nome é Cida, mas todos me conhecem como Cida.
          Sempre gostei de cuidar da minha família e acredito que o carinho,
          o respeito e a união tornam a vida muito mais feliz.
        </p>

        <p>
          Gosto de preparar comidas especiais para reunir todos à mesa,
          conversar sobre a vida, lembrar dos bons momentos e acompanhar o
          crescimento dos filhos, netos e de toda a família.
        </p>

        <p>
          Cada dia é uma oportunidade para agradecer pelas pessoas que fazem
          parte da minha história. A família sempre será meu maior presente e
          minha maior alegria.
        </p>

        <div className="cida-botoes">
          <button>👨‍👩‍👧‍👦 Minha Família</button>
          <button>🍰 Receitas Favoritas</button>
          <br /> <Voltar />
        </div>
      </div>
    </section>
  );
}