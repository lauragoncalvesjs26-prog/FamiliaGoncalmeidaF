//1 importações (primordial)
//2 variaveis e funções gerais (secundario)
//3 função principal (primordial ex:export default function)
//4 estados (secundario)
//5 funções gerais em escopo (secundarias esceto quando precisamos de java script *quase sempre)
//6 retorno (primordial ex:<h1>Aniversários</h1>)

import React, { useState } from "react";

import "./pratica.css"

const meunome = "laura";
const idade = 14;

function Saudar(nome){
    return(
        `ola, ${nome}!`
    )
}

export default function Pratica(){

const [nome, setNome] = useState("");
const [contador, setContador] = useState(0);

function Mostrarmensagem(){
    alert(Saudar(nome))
}

function Almentarcontador(){
    setContador(contador + 1)
}

    return(
        <div className="corpo">
            <h1>
                {meunome}
            </h1>
            <p>
                idade minima: {idade} anos
            </p>
            <input type="text" name="" id="" onChange={
                (evento) => 
                    setNome(evento.target.value)
            } />
            <button onClick={Mostrarmensagem}>
ver
            </button>
            <h2>
                contador: {contador}
            </h2>
            <button onClick={Almentarcontador}>
almentar
            </button>
        </div>
    )
}

