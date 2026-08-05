import { useState } from "react";

export default function Ex() {

    const [estado, setEstado] = useState("");
    const [resultado, setResultado] = useState(null);

    async function buscarTemperatura() {

        const resposta = await fetch(
            `http://localhost:8888/temperatura/${encodeURIComponent(estado)}`
        );

        const json = await resposta.json();

        setResultado(json);

    }

    return (
        <div className="paginaTemperaturaPrincipal">

            <h1 className="tituloTemperaturaPrincipal">
                Consultar Temperatura
            </h1>

            <input
                className="campoTemperaturaEstado"
                placeholder="Digite um estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
            />

            <button
                className="botaoTemperaturaBuscar"
                onClick={buscarTemperatura}
            >
                Buscar
            </button>

            {
                resultado && (

                    resultado.encontrado ?

                        <div className="caixaTemperaturaResultado">

                            <h2 className="tituloEstadoResultado">
                                {resultado.estado}
                            </h2>

                            <p className="textoTemperaturaResultado">
                                🌡️ {resultado.temperatura}°C
                            </p>

                        </div>

                        :

                        <p className="textoErroTemperatura">
                            {resultado.mensagem}
                        </p>

                )
            }

        </div>
    );

}