import React from "react";
import "./laura.css"
import Voltar from "../geral/voltar";


export default function Laura() {
  return (
    <section className="hero-laura">
      <div className="hero-conteudo">
        <h1>Laura</h1>

        <h2>Artista apaixonada por paisagens</h2>

        <p>
          Olá! Meu nome é Laura Gonçalves e uma das minhas maiores paixões
          é desenhar paisagens. Gosto de transformar montanhas, rios,
          florestas e pores do sol em ilustrações cheias de detalhes e
          criatividade.
        </p>

        <p>
          Sempre busco aprender novas técnicas de desenho, experimentar
          diferentes estilos e observar a natureza para criar obras cada
          vez mais bonitas.
        </p>

        <button>Ver meus desenhos</button> <br /><br />
      <Voltar />
      </div>

      <div className="hero-imagem">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800"
          alt="Paisagem natural"
        />
      </div>
    </section>
  )
}