import React from "react";
import "./amanda.css"
import Voltar from "../geral/voltar";


export default function Amanda() {
  return (
    <section className="amanda">
      <div className="amanda-card">
        <h1>Amanda</h1>

        <h2>📚 Apaixonada por livros e viagens ✈️</h2>

        <p>
          Meu nome é Amanda e adoro conhecer novos lugares e viver
          experiências diferentes. Viajar me permite descobrir novas culturas,
          experimentar comidas típicas e criar lembranças inesquecíveis.
        </p>

        <p>
          Além disso, gosto muito de ler. Os livros me levam para mundos
          incríveis, aumentam meu conhecimento e despertam minha imaginação.
          Ler e viajar são duas paixões que fazem parte da minha vida.
        </p>

        <div className="amanda-botoes">
          <button>📖 Livros Favoritos</button>
          <button>🌎 Lugares Visitados</button>
      <br />    <Voltar />
        </div>
      </div>
    </section>
  )
}