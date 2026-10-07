import React, { useState } from "react";

import "./admin.css";

import Usuarios from "../usuarios/usuarios";
import Terminal from "../terminal/terminal";
import Tabela from "../tabela/tabela";
import Rastreio from "../rastreio/rastreio";

export default function Admin() {
  const [pagina, setPagina] = useState(null);

  return (
    <div className="admin-container">

      <h1>Administração</h1>

      <div className="admin-buttons">

        <button
          type="button"
          onClick={() => setPagina("rastreio")}
        >
          📍 Rastreio
        </button>

        <button
          type="button"
          onClick={() => setPagina("tabela")}
        >
          📊 Tabela
        </button>

        <button
          type="button"
          onClick={() => setPagina("terminal")}
        >
          💻 Terminal
        </button>

        <button
          type="button"
          onClick={() => setPagina("usuarios")}
        >
          👥 Usuários
        </button>

      </div>

      <div className="admin-content">

        {pagina === "rastreio" && (
          <Rastreio />
        )}

        {pagina === "tabela" && (
          <Tabela />
        )}

        {pagina === "terminal" && (
          <Terminal />
        )}

        {pagina === "usuarios" && (
          <Usuarios />
        )}

      </div>

    </div>
  );
}