import React from "react";

import "./ingrid.css";
import Voltar from "../geral/voltar";

export default function Ingrid() {
  return (
    <section className="ingrid">
      <div className="ingrid-card">
        <h1>Ingrid</h1>

        <h2>🌸 Minha prima querida 💖</h2>

        <p>
          A Ingrid é minha prima e uma pessoa muito importante para a nossa
          família. Ela é alegre, simpática e sempre consegue deixar qualquer
          ambiente mais leve com seu jeito divertido e carinhoso.
        </p>

        <p>
          Gosto muito dos momentos que passamos juntos, conversando, dando
          risadas e criando lembranças especiais. Ter uma prima como a Ingrid é
          um privilégio, pois ela transmite carinho, amizade e felicidade por
          onde passa.
        </p>

        <div className="ingrid-botoes">
          <button>🌸 Família</button>
          <button>💖 Boas Lembranças</button>
          <br /> <Voltar />
        </div>
      </div>
    </section>
  );
}