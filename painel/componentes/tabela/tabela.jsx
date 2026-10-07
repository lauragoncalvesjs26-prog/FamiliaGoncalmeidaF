import React, { useEffect, useState } from "react";
import { API_URL } from "../../../src/api";
import "./tabela.css";

export default function Tabela() {
  const [tabelas, setTabelas] = useState([]);
  const [tabelaSelecionada, setTabelaSelecionada] = useState(null);
  const [dados, setDados] = useState([]);
  const [colunas, setColunas] = useState([]);

  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    carregarTabelas();
  }, []);

  async function carregarTabelas() {
    try {
      setErro("");

      const resposta = await fetch(`${API_URL}/tabela/tabelas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar as tabelas.");
      }

      const resultado = await resposta.json();

      setTabelas(resultado.tabelas || []);
    } catch (error) {
      console.error(error);
      setErro(error.message);
    }
  }

  async function carregarTabela(nomeTabela) {
    try {
      setCarregando(true);
      setErro("");
      setTabelaSelecionada(nomeTabela);

      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(nomeTabela)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!resposta.ok) {
        const resultado = await resposta.json().catch(() => ({}));
        throw new Error(
          resultado.detail || "Não foi possível carregar esta tabela."
        );
      }

      const resultado = await resposta.json();

      setColunas(resultado.colunas || []);
      setDados(resultado.dados || []);
    } catch (error) {
      console.error(error);
      setErro(error.message);
      setDados([]);
      setColunas([]);
    } finally {
      setCarregando(false);
    }
  }

  function alterarCelula(linhaIndex, coluna, valor) {
    setDados((dadosAtuais) => {
      const novosDados = [...dadosAtuais];

      novosDados[linhaIndex] = {
        ...novosDados[linhaIndex],
        [coluna]: valor,
      };

      return novosDados;
    });
  }

  async function salvarLinha(linha) {
    const id = linha.id;

    if (id === undefined || id === null) {
      alert(
        "Esta tabela não possui uma coluna 'id'. Não é possível identificar esta linha."
      );
      return;
    }

    try {
      setSalvando(true);

      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}/${encodeURIComponent(id)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(linha),
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao salvar a linha."
        );
      }

      alert("Linha salva com sucesso! ✅");

      await carregarTabela(tabelaSelecionada);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setSalvando(false);
    }
  }

  async function apagarLinha(linha) {
    const id = linha.id;

    if (id === undefined || id === null) {
      alert("Esta linha não possui um ID.");
      return;
    }

    const confirmou = window.confirm(
      `Tem certeza que deseja apagar a linha com ID ${id}?\n\nEssa operação não pode ser desfeita.`
    );

    if (!confirmou) return;

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao apagar a linha."
        );
      }

      alert("Linha apagada com sucesso! 🗑️");

      await carregarTabela(tabelaSelecionada);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function adicionarLinha() {
    if (!tabelaSelecionada) return;

    const valores = {};

    for (const coluna of colunas) {
      if (coluna === "id") continue;

      const valor = window.prompt(
        `Digite o valor para a coluna "${coluna}":`
      );

      if (valor !== null) {
        valores[coluna] = valor;
      }
    }

    if (Object.keys(valores).length === 0) {
      return;
    }

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valores),
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao adicionar linha."
        );
      }

      alert("Linha adicionada com sucesso! ✅");

      await carregarTabela(tabelaSelecionada);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function apagarTabela() {
    if (!tabelaSelecionada) return;

    const confirmou = window.confirm(
      `ATENÇÃO!\n\nIsso irá apagar a tabela "${tabelaSelecionada}" inteira.\n\nEssa operação é destrutiva e não pode ser desfeita.\n\nDeseja continuar?`
    );

    if (!confirmou) return;

    const confirmacaoFinal = window.prompt(
      `Digite o nome da tabela para confirmar:\n\n${tabelaSelecionada}`
    );

    if (confirmacaoFinal !== tabelaSelecionada) {
      alert("Confirmação incorreta.");
      return;
    }

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao apagar tabela."
        );
      }

      alert("Tabela apagada com sucesso.");

      setTabelaSelecionada(null);
      setDados([]);
      setColunas([]);

      await carregarTabelas();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function limparTabela() {
    if (!tabelaSelecionada) return;

    const confirmou = window.confirm(
      `Deseja realmente limpar TODOS os registros da tabela "${tabelaSelecionada}"?\n\nA estrutura da tabela será mantida.`
    );

    if (!confirmou) return;

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}/limpar`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao limpar tabela."
        );
      }

      alert(
        `Tabela limpa. ${resultado.linhas_apagadas} linha(s) apagada(s).`
      );

      await carregarTabela(tabelaSelecionada);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function contarLinhas() {
    if (!tabelaSelecionada) return;

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}/contar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao contar linhas."
        );
      }

      alert(
        `A tabela "${tabelaSelecionada}" possui ${resultado.total} linha(s).`
      );
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function adicionarColuna() {
    const nome = window.prompt("Nome da nova coluna:");

    if (!nome) return;

    const tipo = window.prompt(
      "Tipo da coluna MySQL:\n\nExemplos:\nVARCHAR(255)\nTEXT\nINT\nDECIMAL(10,2)\nDATE\nDATETIME\nBOOLEAN",
      "VARCHAR(255)"
    );

    if (!tipo) return;

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}/coluna`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            tipo,
          }),
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao adicionar coluna."
        );
      }

      alert("Coluna adicionada com sucesso! ✅");

      await carregarTabela(tabelaSelecionada);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function renomearColuna() {
    if (colunas.length === 0) return;

    const antiga = window.prompt(
      `Qual coluna deseja renomear?\n\n${colunas.join("\n")}`
    );

    if (!antiga || !colunas.includes(antiga)) {
      alert("Coluna inválida.");
      return;
    }

    if (antiga === "id") {
      alert("A coluna id não pode ser renomeada por esta tela.");
      return;
    }

    const nova = window.prompt(
      `Novo nome para "${antiga}":`
    );

    if (!nova) return;

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}/coluna/renomear`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            antiga,
            nova,
          }),
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao renomear coluna."
        );
      }

      alert("Coluna renomeada com sucesso! ✅");

      await carregarTabela(tabelaSelecionada);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function apagarColuna() {
    if (colunas.length === 0) return;

    const nome = window.prompt(
      `Qual coluna deseja apagar?\n\n${colunas.join("\n")}`
    );

    if (!nome || !colunas.includes(nome)) {
      alert("Coluna inválida.");
      return;
    }

    if (nome === "id") {
      alert("A coluna id não pode ser apagada.");
      return;
    }

    const confirmou = window.confirm(
      `Tem certeza que deseja apagar a coluna "${nome}"?\n\nTODOS os dados dessa coluna serão perdidos.`
    );

    if (!confirmou) return;

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}/coluna/${encodeURIComponent(nome)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao apagar coluna."
        );
      }

      alert("Coluna apagada com sucesso.");

      await carregarTabela(tabelaSelecionada);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function copiarEstrutura() {
    if (!tabelaSelecionada) return;

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}/estrutura`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao obter estrutura."
        );
      }

      await navigator.clipboard.writeText(
        resultado.sql
      );

      alert("Estrutura copiada! 📋");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function copiarDadosJson() {
    if (!tabelaSelecionada) return;

    try {
      const resposta = await fetch(
        `${API_URL}/tabela/${encodeURIComponent(
          tabelaSelecionada
        )}/json`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.detail || "Erro ao obter JSON."
        );
      }

      await navigator.clipboard.writeText(
        JSON.stringify(resultado.dados, null, 2)
      );

      alert("Dados JSON copiados! 📋");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function copiarSelect() {
    if (!tabelaSelecionada) return;

    const sql = `SELECT * FROM \`${tabelaSelecionada}\`;`;

    try {
      await navigator.clipboard.writeText(sql);
      alert("SELECT * copiado! 📋");
    } catch (error) {
      console.error(error);
      alert("Não foi possível copiar.");
    }
  }

  return (
    <div className="tabela-container">
      <div className="tabela-cabecalho">
        <h1>📊 Tabelas do Banco</h1>

        <p>
          Selecione uma tabela para visualizar e editar
          seus dados.
        </p>
      </div>

      {erro && (
        <div className="tabela-erro">
          ❌ {erro}
        </div>
      )}

      <div className="tabelas-lista">
        {tabelas.map((nomeTabela) => (
          <button
            key={nomeTabela}
            type="button"
            className={
              tabelaSelecionada === nomeTabela
                ? "tabela-botao ativo"
                : "tabela-botao"
            }
            onClick={() => carregarTabela(nomeTabela)}
          >
            🗃️ {nomeTabela}
          </button>
        ))}
      </div>

      {tabelaSelecionada && (
        <div className="tabela-area">
          <div className="tabela-area-header">
            <div>
              <h2>🗂️ {tabelaSelecionada}</h2>

              <span>
                {dados.length} registro(s) •{" "}
                {colunas.length} coluna(s)
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                carregarTabela(tabelaSelecionada)
              }
              className="botao-atualizar"
            >
              🔄 Atualizar
            </button>
          </div>

          <div className="tabela-ferramentas">
            <div className="grupo-botoes">
              <strong>📋 Copiar</strong>

              <button
                type="button"
                onClick={copiarEstrutura}
              >
                📐 Estrutura
              </button>

              <button
                type="button"
                onClick={copiarDadosJson}
              >
                {} JSON
              </button>

              <button
                type="button"
                onClick={copiarSelect}
              >
                📄 SELECT *
              </button>
            </div>

            <div className="grupo-botoes">
              <strong>🛠️ Colunas</strong>

              <button
                type="button"
                onClick={adicionarColuna}
              >
                ➕ Adicionar coluna
              </button>

              <button
                type="button"
                onClick={renomearColuna}
              >
                ✏️ Renomear coluna
              </button>

              <button
                type="button"
                onClick={apagarColuna}
              >
                🗑️ Apagar coluna
              </button>
            </div>

            <div className="grupo-botoes">
              <strong>🗄️ Tabela</strong>

              <button
                type="button"
                onClick={adicionarLinha}
              >
                ➕ Adicionar linha
              </button>

              <button
                type="button"
                onClick={limparTabela}
              >
                🧹 Limpar tabela
              </button>

              <button
                type="button"
                onClick={contarLinhas}
              >
                🔢 Contar linhas
              </button>

              <button
                type="button"
                onClick={apagarTabela}
                className="botao-perigo"
              >
                💥 Apagar tabela
              </button>
            </div>
          </div>

          {carregando ? (
            <div className="tabela-loading">
              Carregando dados...
            </div>
          ) : dados.length === 0 ? (
            <div className="tabela-vazia">
              <p>Esta tabela não possui registros.</p>

              <button
                type="button"
                onClick={adicionarLinha}
                className="botao-adicionar"
              >
                ➕ Adicionar primeira linha
              </button>
            </div>
          ) : (
            <div className="tabela-scroll">
              <table className="tabela-dados">
                <thead>
                  <tr>
                    {colunas.map((coluna) => (
                      <th key={coluna}>
                        {coluna}
                      </th>
                    ))}

                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {dados.map((linha, linhaIndex) => (
                    <tr
                      key={
                        linha.id ??
                        linhaIndex
                      }
                    >
                      {colunas.map((coluna) => (
                        <td key={coluna}>
                          <input
                            type="text"
                            value={
                              linha[coluna] === null ||
                              linha[coluna] === undefined
                                ? ""
                                : String(
                                    linha[coluna]
                                  )
                            }
                            disabled={
                              coluna === "id"
                            }
                            onChange={(e) =>
                              alterarCelula(
                                linhaIndex,
                                coluna,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      ))}

                      <td className="tabela-acoes">
                        <button
                          type="button"
                          onClick={() =>
                            salvarLinha(linha)
                          }
                          disabled={salvando}
                          className="botao-salvar"
                        >
                          💾 Salvar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            apagarLinha(linha)
                          }
                          className="botao-apagar"
                        >
                          🗑️ Apagar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {!tabelaSelecionada && !erro && (
        <div className="tabela-instrucao">
          👆 Escolha uma tabela acima para começar.
        </div>
      )}
    </div>
  );
}