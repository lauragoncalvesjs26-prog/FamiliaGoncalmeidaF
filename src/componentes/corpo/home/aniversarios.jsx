import React from "react";

import "./aniversarios.css";

// =========================================================
// ARRAY DE ANIVERSÁRIOS
// =========================================================

const aniversarios = [
  {
    nome: "Laura",
    emoji: "🎨",
    data: "2012-04-18",
    grupo: "Família",
  },
  {
    nome: "Amanda",
    emoji: "📚",
    data: "1988-11-02",
    grupo: "Família",
  },
  {
    nome: "Daniel",
    emoji: "⚽",
    data: "1985-11-29",
    grupo: "Família",
  },
  {
    nome: "Kiba",
    emoji: "🐺",
    data: "2023-12-22",
    grupo: "Família",
  },
  {
    nome: "Nestor",
    emoji: "🎩",
    data: "1961-02-17",
    grupo: "Família",
  },
  {
    nome: "Cida",
    emoji: "🌷",
    data: "1980-07-28",
    grupo: "Família",
  },
  {
    nome: "Ingrid",
    emoji: "🦋",
    data: "2012-03-05",
    grupo: "Família",
  },
  {
    nome: "Hector",
    emoji: "💻",
    data: "2010-12-10",
    grupo: "Amigos",
  },
  {
    nome: "Katlen",
    emoji: "✨",
    data: "2012-06-05",
    grupo: "Amigos",
  },
  {
    nome: "Megan",
    emoji: "🌸",
    data: "2012-01-29",
    grupo: "Amigos",
  },
];

// =========================================================
// CALCULAR PRÓXIMO ANIVERSÁRIO
// =========================================================

function calcularProximoAniversario(dataNascimento) {
  const hoje = new Date();

  const nascimento = new Date(
    `${dataNascimento}T00:00:00`
  );

  let proximoAniversario = new Date(
    hoje.getFullYear(),
    nascimento.getMonth(),
    nascimento.getDate()
  );

  if (proximoAniversario < hoje) {
    proximoAniversario = new Date(
      hoje.getFullYear() + 1,
      nascimento.getMonth(),
      nascimento.getDate()
    );
  }

  const diferenca =
    proximoAniversario.getTime() - hoje.getTime();

  const diasRestantes = Math.ceil(
    diferenca / (1000 * 60 * 60 * 24)
  );

  return {
    data: proximoAniversario,
    diasRestantes,
  };
}

// =========================================================
// FORMATAR DATA
// =========================================================

function formatarData(data) {
  return data.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  });
}

// =========================================================
// COMPONENTE
// =========================================================

export default function Aniversarios({ podeVerDaniel }) {
  // =======================================================
  // FILTRAR ANIVERSÁRIOS
  //
  // Se podeVerDaniel for false:
  // Daniel é removido completamente.
  //
  // Se podeVerDaniel for true:
  // Todos aparecem normalmente.
  // =======================================================

  const aniversariosVisiveis = aniversarios.filter(
    (pessoa) => pessoa.nome !== "Daniel" || podeVerDaniel
  );

  // =======================================================
  // CALCULAR DADOS DOS ANIVERSÁRIOS VISÍVEIS
  // =======================================================

  const aniversariosComDados = aniversariosVisiveis.map(
    (pessoa) => {
      const proximo = calcularProximoAniversario(
        pessoa.data
      );

      return {
        ...pessoa,
        ...proximo,
      };
    }
  );

  // =======================================================
  // ORDENAR POR PRÓXIMO ANIVERSÁRIO
  // =======================================================

  const aniversariosOrdenados = [
    ...aniversariosComDados,
  ].sort(
    (a, b) =>
      a.diasRestantes - b.diasRestantes
  );

  // =======================================================
  // PEGAR PRÓXIMO ANIVERSARIANTE
  // =======================================================

  const proximoAniversariante =
    aniversariosOrdenados[0];

  // =======================================================
  // SEGURANÇA EXTRA
  //
  // Evita erro caso não exista nenhum aniversário visível.
  // =======================================================

  if (!proximoAniversariante) {
    return (
      <div className="aniversarios-page">
        <header className="aniversarios-header">
          <div className="aniversarios-header-icon">
            🎂
          </div>

          <div>
            <h1>Aniversários</h1>

            <p>
              Confira as próximas datas especiais
              da família e dos amigos.
            </p>
          </div>
        </header>

        <section className="aniversarios-conteudo">
          <p>
            Nenhum aniversário disponível.
          </p>
        </section>
      </div>
    );
  }

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="aniversarios-page">

      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <header className="aniversarios-header">

        <div className="aniversarios-header-icon">
          🎂
        </div>

        <div>
          <h1>Aniversários</h1>

          <p>
            Confira as próximas datas especiais
            da família e dos amigos.
          </p>
        </div>

      </header>

      {/* =================================================
          PRÓXIMO ANIVERSARIANTE
      ================================================= */}

      <section className="proximo-aniversariante">

        <div className="proximo-info">

          <span className="proximo-label">
            🎉 PRÓXIMO ANIVERSARIANTE
          </span>

          <h2>
            {proximoAniversariante.emoji}{" "}
            {proximoAniversariante.nome}
          </h2>

          <p>
            O aniversário será no dia{" "}

            <strong>
              {formatarData(
                proximoAniversariante.data
              )}
            </strong>
          </p>

        </div>

        <div className="contador-aniversario">

          <strong>
            {proximoAniversariante.diasRestantes}
          </strong>

          <span>
            {proximoAniversariante.diasRestantes === 1
              ? "dia restante"
              : "dias restantes"}
          </span>

        </div>

      </section>

      {/* =================================================
          TODOS OS ANIVERSÁRIOS
      ================================================= */}

      <section className="aniversarios-conteudo">

        <div className="titulo-secao">

          <div>
            <h2>Todos os aniversários</h2>

            <p>
              Datas especiais das pessoas importantes
              para você.
            </p>
          </div>

          <span className="total-pessoas">
            {aniversariosVisiveis.length}{" "}
            {aniversariosVisiveis.length === 1
              ? "pessoa"
              : "pessoas"}
          </span>

        </div>

        {/* =================================================
            GRID
        ================================================= */}

        <div className="aniversarios-grid">

          {aniversariosOrdenados.map(
            (pessoa) => {

              const ehProximo =
                pessoa.nome ===
                proximoAniversariante.nome;

              return (
                <div
                  className={`aniversario-card ${
                    ehProximo
                      ? "aniversario-destaque"
                      : ""
                  }`}
                  key={pessoa.nome}
                >

                  {/* EMOJI */}

                  <div className="pessoa-emoji">
                    {pessoa.emoji}
                  </div>

                  {/* INFORMAÇÕES */}

                  <div className="pessoa-info">

                    <div className="pessoa-topo">

                      <h3>
                        {pessoa.nome}
                      </h3>

                      {ehProximo && (
                        <span className="badge-proximo">
                          Próximo
                        </span>
                      )}

                    </div>

                    <span className="grupo-pessoa">
                      {pessoa.grupo}
                    </span>

                    <p className="data-nascimento">
                      🎂{" "}
                      {formatarData(
                        pessoa.data
                      )}
                    </p>

                  </div>

                  {/* DIAS */}

                  <div className="dias-card">

                    <strong>
                      {pessoa.diasRestantes}
                    </strong>

                    <span>
                      {pessoa.diasRestantes === 1
                        ? "dia"
                        : "dias"}
                    </span>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </section>

    </div>
  );
}