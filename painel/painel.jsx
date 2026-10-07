import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Admin from "./componentes/admin/admin";
import { API_URL } from "../src/api";

export default function Painel() {
  const [carregando, setCarregando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    async function verificarAcesso() {
      const token = localStorage.getItem("token");

      // =====================================================
      // SEM TOKEN
      // =====================================================

      if (!token) {
        setAutorizado(false);
        setCarregando(false);
        return;
      }

      try {
        const resposta = await fetch(
          `${API_URL}/painel/acesso`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // =====================================================
        // ACESSO AUTORIZADO
        // =====================================================

        if (resposta.ok) {
          setAutorizado(true);
        } else {
          setAutorizado(false);
        }

      } catch (erro) {
        console.error(
          "Erro ao verificar acesso ao painel:",
          erro
        );

        setAutorizado(false);

      } finally {
        setCarregando(false);
      }
    }

    verificarAcesso();
  }, []);

  // =========================================================
  // VERIFICANDO ACESSO
  // =========================================================

  if (carregando) {
    return (
      <div>
        Verificando acesso...
      </div>
    );
  }

  // =========================================================
  // SEM AUTORIZAÇÃO
  // =========================================================

  if (!autorizado) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  // =========================================================
  // PAINEL
  // =========================================================

  return (
    <div>
      <Admin />
    </div>
  );
}