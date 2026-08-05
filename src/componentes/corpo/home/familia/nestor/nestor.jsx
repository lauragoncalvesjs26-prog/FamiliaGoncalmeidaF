import React from "react";
import "./nestor.css"
import Voltar from "../geral/voltar";

export default function Nestor() {
  return (
    <section className="nestor">
      <div className="nestor-card">
        <h1>👴 Nestor</h1>

        <h2>🌿 Sabedoria, Família e Boas Histórias</h2>

        <p>
          Meu nome é Nestor e tenho muito orgulho da minha família.
          Ao longo da vida aprendi que o respeito, a honestidade e a dedicação
          são valores que fazem toda a diferença. Gosto de reunir todos em
          momentos especiais e compartilhar boas conversas.
        </p>

        <p>
          Também gosto de aproveitar dias tranquilos, cuidar das minhas
          atividades, recordar boas lembranças e contar histórias que marcaram
          diferentes momentos da minha vida. Estar ao lado da família é uma das
          maiores alegrias que tenho.
        </p>

        <div className="nestor-botoes">
          <button>👨‍👩‍👧‍👦 Minha Família</button>
          <button>📖 Minhas Histórias</button>
          <br /> <Voltar />
        </div>
      </div>
    </section>
  );
}