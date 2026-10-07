import React, { useState } from "react";
import { API_URL } from "../../../src/api";
import "./terminal.css";


export default function Terminal() {

    const [terminalComando, setTerminalComando] =
        useState("");

    const [terminalHistorico, setTerminalHistorico] =
        useState([]);

    const [terminalExecutando, setTerminalExecutando] =
        useState(false);


    const token =
        localStorage.getItem("token");


    // =====================================================
    // HEADERS
    // =====================================================

    function headersTerminal() {

        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        };
    }


    // =====================================================
    // FORMATAR RESULTADO
    // =====================================================

    function formatarResultadoTerminal(resultado) {

        if (
            resultado === null ||
            resultado === undefined
        ) {

            return "";
        }


        if (typeof resultado === "string") {

            return resultado;
        }


        try {

            return JSON.stringify(
                resultado,
                null,
                2
            );

        } catch (error) {

            return String(resultado);
        }
    }


    // =====================================================
    // EXECUTAR COMANDO
    // =====================================================

    async function executarTerminal() {

        const comando =
            terminalComando.trim();


        if (
            !comando ||
            terminalExecutando
        ) {

            return;
        }


        // =================================================
        // ADICIONAR COMANDO AO HISTÓRICO
        // =================================================

        setTerminalHistorico(
            historicoAnterior => [

                ...historicoAnterior,

                {
                    tipo: "comando",
                    texto: `$ ${comando}`
                }

            ]
        );


        setTerminalComando("");

        setTerminalExecutando(true);


        try {

            const resposta = await fetch(
                `${API_URL}/terminal`,
                {
                    method: "POST",

                    headers: headersTerminal(),

                    body: JSON.stringify({
                        comando: comando
                    })
                }
            );


            let dados;

            try {

                dados =
                    await resposta.json();

            } catch (error) {

                dados = {};
            }


            // =================================================
            // ERRO HTTP
            // =================================================

            if (!resposta.ok) {

                let mensagem =
                    "Erro ao executar comando.";


                if (
                    typeof dados.detail ===
                    "string"
                ) {

                    mensagem =
                        dados.detail;

                } else if (
                    dados.detail &&
                    typeof dados.detail ===
                    "object"
                ) {

                    mensagem =
                        dados.detail.erro ||
                        "Erro ao executar comando.";
                }


                throw new Error(
                    mensagem
                );
            }


            // =================================================
            // CONSULTA ÚNICA
            // =================================================

            if (
                dados.tipo === "consulta"
            ) {

                setTerminalHistorico(
                    historicoAnterior => [

                        ...historicoAnterior,

                        {
                            tipo: "resultado",

                            texto:
                                formatarResultadoTerminal(
                                    dados.resultado
                                )
                        }

                    ]
                );


                return;
            }


            // =================================================
            // MÚLTIPLAS CONSULTAS
            // =================================================

            if (
                dados.tipo === "multiplo"
            ) {

                const blocos =
                    [];


                if (
                    Array.isArray(
                        dados.consultas
                    )
                ) {

                    dados.consultas.forEach(
                        consulta => {

                            blocos.push(
                                `Comando ${consulta.comando} | ${consulta.quantidade} registro(s)`
                            );


                            blocos.push(
                                formatarResultadoTerminal(
                                    consulta.resultado
                                )
                            );
                        }
                    );
                }


                if (
                    dados.afetados !==
                    undefined
                ) {

                    blocos.push(
                        `Registros afetados: ${dados.afetados}`
                    );
                }


                setTerminalHistorico(
                    historicoAnterior => [

                        ...historicoAnterior,

                        {
                            tipo: "resultado",

                            texto:
                                blocos.join(
                                    "\n\n"
                                )
                        }

                    ]
                );


                return;
            }


            // =================================================
            // COMANDO SEM RESULTADO
            // =================================================

            setTerminalHistorico(
                historicoAnterior => [

                    ...historicoAnterior,

                    {
                        tipo: "resultado",

                        texto:
                            dados.mensagem ||
                            `Comando executado com sucesso. Registros afetados: ${dados.afetados || 0}`
                    }

                ]
            );


        } catch (erro) {

            setTerminalHistorico(
                historicoAnterior => [

                    ...historicoAnterior,

                    {
                        tipo: "erro",

                        texto:
                            `Erro: ${erro.message}`
                    }

                ]
            );

        } finally {

            setTerminalExecutando(false);
        }
    }


    // =====================================================
    // TECLADO
    // =====================================================

    function tratarTeclaTerminal(evento) {

        if (
            evento.key === "Enter" &&
            !evento.shiftKey
        ) {

            evento.preventDefault();

            executarTerminal();
        }
    }


    // =====================================================
    // LIMPAR
    // =====================================================

    function limparTerminal() {

        setTerminalHistorico([]);
    }


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="terminal-container">


            {/* =================================================
                CABEÇALHO
            ================================================= */}

            <div className="terminal-header">

                <div className="terminal-titulo">

                    <span
                        className="terminal-indicador"
                    />

                    Terminal SQL

                </div>


                <button
                    type="button"
                    onClick={limparTerminal}
                    className="terminal-limpar"
                >
                    Limpar
                </button>

            </div>


            {/* =================================================
                CORPO
            ================================================= */}

            <div className="terminal-corpo">


                {/* =================================================
                    HISTÓRICO
                ================================================= */}

                {terminalHistorico.map(
                    (item, index) => (

                        <div
                            key={`${index}-${item.tipo}`}
                            className={
                                `terminal-linha terminal-${item.tipo}`
                            }
                        >

                            {item.tipo ===
                                "resultado"
                                ? (
                                    <pre
                                        className="terminal-resultado-pre"
                                    >
                                        {item.texto}
                                    </pre>
                                )
                                : (
                                    item.texto
                                )
                            }

                        </div>

                    )
                )}


                {/* =================================================
                    INPUT
                ================================================= */}

                <div
                    className="terminal-input-area"
                >

                    <span
                        className="terminal-prompt"
                    >
                        $
                    </span>


                    <textarea
                        value={terminalComando}

                        onChange={evento =>
                            setTerminalComando(
                                evento.target.value
                            )
                        }

                        onKeyDown={
                            tratarTeclaTerminal
                        }

                        placeholder={
                            "Digite um comando SQL..."
                        }

                        disabled={
                            terminalExecutando
                        }

                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck="false"

                        rows={1}
                    />


                    <button
                        type="button"

                        onClick={
                            executarTerminal
                        }

                        disabled={
                            terminalExecutando ||
                            !terminalComando.trim()
                        }
                    >

                        {terminalExecutando
                            ? "Executando..."
                            : "Executar"
                        }

                    </button>

                </div>

            </div>

        </div>
    );
}
