import React from "react";

import "./megan.css";
import Voltar from "../geral/voltar";

export default function Megan() {
  return (
    <section className="megan">
      <div className="megan-card">
        <h1>Megan</h1>

        <h2>💙 Minha melhor amiga 🌟</h2>

        <p>
          A Megan é uma das pessoas mais importantes da minha vida. Nossa
          amizade é construída com muita confiança, respeito e parceria. Sempre
          encontramos um jeito de transformar momentos simples em lembranças
          inesquecíveis.
        </p>

        <p>
          Ela é uma pessoa alegre, inteligente e muito divertida. Saber que
          posso contar com sua amizade me deixa muito feliz, e espero que nossa
          amizade continue forte por muitos e muitos anos.
        </p>

        <div className="megan-botoes">
          <button>💙 Melhor Amiga</button>
          <button>🌟 Momentos Especiais</button>
          <div className="voltar" >
            <Voltar />
          </div>
        </div>
      </div>
    </section>
  );
}