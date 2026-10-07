import React, { useEffect } from "react";

export default function TesteApi8888() {
    useEffect(() => {
        const testarApi = async () => {
            try {
                console.log("====================================");
                console.log("TESTANDO API NA PORTA 8888");
                console.log("====================================");

                const url = "http://127.0.0.1:8888/painel/api/teste";

                console.log("URL:", url);

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });

                console.log("STATUS:", response.status);
                console.log("STATUS TEXT:", response.statusText);
                console.log("OK:", response.ok);

                const respostaTexto = await response.text();

                console.log("RESPOSTA DA API:", respostaTexto);

                if (!response.ok) {
                    console.error(
                        `ERRO HTTP ${response.status}: ${response.statusText}`
                    );
                }

                console.log("====================================");
            } catch (error) {
                console.error("====================================");
                console.error("ERRO AO CHAMAR A PORTA 8888");
                console.error("====================================");
                console.error(error);
            }
        };

        testarApi();
    }, []);

    return (
        <section className="teste-api-8888-area-principal">
            <div className="teste-api-8888-conteudo-terminal">
                <h1 className="teste-api-8888-titulo">
                    Teste API porta 8888
                </h1>

                <p className="teste-api-8888-descricao">
                    Abra o console do navegador para visualizar o resultado
                    da requisição.
                </p>
            </div>
        </section>
    );
}

