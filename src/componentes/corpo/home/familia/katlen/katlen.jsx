import React from "react";
import "./katlen.css";
import Voltar from "../geral/voltar";

export default function Katlen() {
  return (
    <section className="katlen">
      <div className="katlen-card">
        <h1>Katlen</h1>

        <h2>💜 Minha melhor amiga ✨</h2>

        <p>
          A Katlen é uma pessoa muito especial na minha vida. Sempre está
          presente nos momentos importantes, oferecendo amizade, companheirismo
          e muitas risadas. É alguém em quem posso confiar e contar sempre que
          preciso.
        </p>

        <p>
          Além de ser uma excelente amiga, ela é divertida, gentil e muito
          dedicada em tudo o que faz. Nossa amizade é construída com respeito,
          confiança e boas lembranças que levaremos para a vida toda.
        </p>

        <div className="katlen-botoes">
          <button>💜 Melhor Amiga</button>
          <button>✨ Grandes Momentos</button>
          <br /> <Voltar />
        </div>
      </div>
    </section>
  );
}